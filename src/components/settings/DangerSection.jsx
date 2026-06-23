import { useState } from "react";
import { Download, RotateCcw, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { exportData, resetWorkspace, deleteAccount } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useTaskStore } from "../../store/taskStore";

function DangerButton({ variant, children, icon: Icon, onClick, loading }) {
  const styles = {
    secondary: "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.07] hover:text-white",
    danger:    "border-red-500/20 bg-red-500/[0.08] text-red-400 hover:bg-red-500/[0.12]",
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center gap-2 rounded-xl border
        px-4 py-2 text-sm font-medium
        transition-all duration-200 flex-shrink-0
        disabled:opacity-50 disabled:cursor-not-allowed
        ${styles[variant]}
      `}
    >
      {loading
        ? <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        : Icon && <Icon size={15} />
      }
      {children}
    </button>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="
        w-full max-w-sm rounded-2xl
        border border-white/10
        bg-zinc-950 p-6 shadow-2xl
      ">
        <p className="text-sm text-zinc-300">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 hover:bg-white/[0.07]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/15"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function DangerSection() {
  const navigate        = useNavigate();
  const { clearAuth }   = useAuthStore();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const loadTasks       = useTaskStore((s) => s.loadTasks);

  const [loadingExport, setLoadingExport]   = useState(false);
  const [loadingReset,  setLoadingReset]    = useState(false);
  const [loadingDelete, setLoadingDelete]   = useState(false);
  const [confirm, setConfirm]               = useState(null); // "reset" | "delete" | null

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const data = await exportData();
      // Trigger file download
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "flowforge-export.json";
      a.click();
      URL.revokeObjectURL(url);
      addNotification({
        title:   "Export complete",
        message: "Your data has been downloaded.",
        type:    "success",
      });
    } catch (err) {
      addNotification({ title: "Error", message: err.message, type: "error" });
    } finally {
      setLoadingExport(false);
    }
  };

  const handleReset = async () => {
    setConfirm(null);
    setLoadingReset(true);
    try {
      await resetWorkspace();
      await loadTasks(); // refresh task store
      addNotification({
        title:   "Workspace reset",
        message: "All tasks and notifications have been cleared.",
        type:    "info",
      });
    } catch (err) {
      addNotification({ title: "Error", message: err.message, type: "error" });
    } finally {
      setLoadingReset(false);
    }
  };

  const handleDelete = async () => {
    setConfirm(null);
    setLoadingDelete(true);
    try {
      await deleteAccount();
      clearAuth();
      navigate("/");
    } catch (err) {
      addNotification({ title: "Error", message: err.message, type: "error" });
      setLoadingDelete(false);
    }
  };

  return (
    <>
      {confirm === "reset" && (
        <ConfirmDialog
          message="This will permanently delete all your tasks and notifications. Your account will remain active. Are you sure?"
          onConfirm={handleReset}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm === "delete" && (
        <ConfirmDialog
          message="This will permanently delete your account and all associated data. This cannot be undone. Are you sure?"
          onConfirm={handleDelete}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="rounded-2xl border border-red-500/[0.12] bg-white/[0.02] p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-red-500/60">
          Permanent actions
        </p>
        <div className="space-y-0">

          <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 text-zinc-500">
                <Download size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Export all data</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Download a full copy of your tasks, analytics, and settings
                </p>
              </div>
            </div>
            <DangerButton
              variant="secondary"
              icon={Download}
              loading={loadingExport}
              onClick={handleExport}
            >
              Export
            </DangerButton>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-white/[0.04] py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 text-zinc-500">
                <RotateCcw size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Reset workspace</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Clears all tasks and notifications — your account stays active
                </p>
              </div>
            </div>
            <DangerButton
              variant="danger"
              icon={RotateCcw}
              loading={loadingReset}
              onClick={() => setConfirm("reset")}
            >
              Reset
            </DangerButton>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 text-zinc-500">
                <Trash2 size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">Delete account</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Permanently deletes your account and all associated data
                </p>
              </div>
            </div>
            <DangerButton
              variant="danger"
              icon={Trash2}
              loading={loadingDelete}
              onClick={() => setConfirm("delete")}
            >
              Delete account
            </DangerButton>
          </div>

        </div>
      </div>
    </>
  );
}

export default DangerSection;