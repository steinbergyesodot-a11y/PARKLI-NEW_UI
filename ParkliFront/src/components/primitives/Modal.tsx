import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      // Fires for Escape as well as dialog.close(), keeping parent state in sync.
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn("m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg p-0 backdrop:bg-black/50", className)}
    >
      <div className="flex max-h-[85vh] flex-col gap-4 overflow-y-auto p-5">
        <div className="flex items-start justify-between gap-3">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="ml-auto text-2xl leading-none text-text-muted"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
