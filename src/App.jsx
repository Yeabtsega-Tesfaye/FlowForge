import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useUserInit } from "./hooks/useUserInit";

import CommandPalette from "./components/ui/CommandPalette";
import SearchModal from "./components/ui/SearchModal";
import NotificationCenter from "./components/ui/NotificationCenter";

import { useCommandPaletteStore } from "./store/commandPaletteStore";
import { useSearchModalStore } from "./store/searchModalStore";
import { useAuthStore } from "./store/authStore";

import { useTaskUIStore } from "./store/taskModalStore";
import TaskDetailsModal from "./components/tasks/TaskDetailsModal";
import TaskModal from "./components/tasks/TaskModal";
import { useTaskStore } from "./store/taskStore";

function App() {
  useUserInit();

  const {
    open: commandOpen,
    openPalette,
    closePalette,
  } = useCommandPaletteStore();

  const {
    open: searchOpen,
    openSearch,
    closeSearch,
  } = useSearchModalStore();

  const { selectedTaskId, mode, closeTask, openTask } =
    useTaskUIStore();

  const tasks = useTaskStore((s) => s.tasks);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();

      if ((e.ctrlKey || e.metaKey) && key === "k") {
        e.preventDefault();
        commandOpen ? closePalette() : openPalette();
      }

      if ((e.ctrlKey || e.metaKey) && key === "f") {
        e.preventDefault();
        searchOpen ? closeSearch() : openSearch();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [
    commandOpen,
    searchOpen,
    openPalette,
    closePalette,
    openSearch,
    closeSearch,
  ]);

  return (
    <>
      {/* TASK DETAILS MODAL */}
      <TaskDetailsModal
        open={mode === "details"}
        task={selectedTask}
        onClose={closeTask}
        onEdit={() => openTask(selectedTask, "edit")}
        onStatusChange={(task) =>
          toggleTaskStatus(task.id)
        }
      />

      {/* TASK CREATE / EDIT MODAL */}
      <TaskModal
        open={mode === "create" || mode === "edit"}
        editingTask={mode === "edit" ? selectedTask : null}
        onClose={closeTask}
      />

      {/* GLOBAL MODALS */}
      <CommandPalette
        open={commandOpen}
        onClose={closePalette}
      />

      <SearchModal
        open={searchOpen}
        onClose={closeSearch}
      />

      <NotificationCenter />

      <AppRoutes />
    </>
  );
}

export default App;