import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../lib/prisma.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chat = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;
    const userId = req.user.id;

    // fetch user's tasks for context
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const taskSummary = tasks.map((t) => ({
      title:       t.title,
      status:      t.status,
      priority:    t.priority,
      category:    t.category,
      dueDate:     t.dueDate,
      description: t.description,
    }));

    const systemPrompt = `
You are FlowForge AI, a smart productivity assistant built into FlowForge — a task management SaaS.
You help users manage their tasks, improve their workflow, and stay productive.

Here is the user's current task data:
${JSON.stringify(taskSummary, null, 2)}

You can:
- Suggest task priorities based on due dates and current workload
- Recommend categories for tasks
- Generate clear task descriptions from a short prompt
- Summarize the user's productivity and progress
- Answer questions about their tasks
- Give actionable advice to improve their workflow

Always be concise, friendly, and specific to their actual data.
Never make up tasks that don't exist in the data above.
Format responses cleanly — use bullet points or short paragraphs, never walls of text.
    `.trim();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    // build chat history for multi-turn conversation
    const chatSession = model.startChat({
      history: history.map((msg) => ({
        role:  msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chatSession.sendMessage(message);
    const reply  = result.response.text();

    res.json({ reply });
  } catch (err) {
    next(err);
  }
};