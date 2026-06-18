import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import CommandPalette from "./components/ui/CommandPalette";
import NotificationCenter from "./components/ui/NotificationCenter";
import { useCommandPaletteStore } from "./store/commandPaletteStore";

function App() {
  const { open, closePalette, openPalette } = useCommandPaletteStore();

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, openPalette, closePalette]);

  return (
    <>
      {/* FIXED: Passed the active state props down into your component structure */}
      <CommandPalette open={open} onClose={closePalette} />
      <NotificationCenter />
      <AppRoutes />
    </>
  );
}

export default App;