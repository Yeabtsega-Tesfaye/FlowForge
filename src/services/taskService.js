const delay = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const taskService = {
  async getTasks(tasks) {
    await delay(500);
    return tasks;
  },

  async createTask(task) {
    await delay(700);

    return {
      id: Date.now(),
      ...task,
    };
  },

  async deleteTask(id) {
    await delay(400);
    return id;
  },

  async updateTask(task) {
    await delay(500);
    return task;
  },
};