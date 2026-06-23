import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useUserInit } from "./hooks/useUserInit";

import CommandPalette from "./components/ui/CommandPalette";
import SearchModal from "./components/ui/SearchModal";
import NotificationCenter from "./components/ui/NotificationCenter";

import { useCommandPaletteStore } from "./store/commandPaletteStore";
import { useSearchModalStore } from "./store/searchModalStore";
import { useAuthStore } from "./store/authStore";

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

    const loadUser = useAuthStore((s) => s.loadUser);

  // Rehydrate user from API on every page load
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();

      // Ctrl/Cmd + K → Command Palette
      if ((e.ctrlKey || e.metaKey) && key === "k") {
        e.preventDefault();

        commandOpen
          ? closePalette()
          : openPalette();

        return;
      }

      // Ctrl/Cmd + F → Task Search
      if ((e.ctrlKey || e.metaKey) && key === "f") {
        e.preventDefault();

        searchOpen
          ? closeSearch()
          : openSearch();
      }
    };

    document.addEventListener("keydown", handler);

    return () =>
      document.removeEventListener("keydown", handler);
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