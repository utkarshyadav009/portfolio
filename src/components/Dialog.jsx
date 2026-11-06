import { useEffect, useRef } from "react";

// Native <dialog>: Esc and focus trapping come from the browser.
export default function Dialog({ open, onClose, labelledBy, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="story-dialog"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={labelledBy}
    >
      {open && (
        <div className="dialog-inner">
          <button type="button" className="dialog-close" onClick={onClose}>
            Close ✕
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
