import { useEffect, useRef } from "react";

// Native <dialog>: Esc and focus trapping come from the browser.
export default function Dialog({ open, onClose, labelledBy, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.scrollTop = 0;
    }
    if (!open && d.open) d.close();
    // Stop the page behind from scrolling while a story is open.
    document.documentElement.classList.toggle("dialog-open", !!open);
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
        <>
          {/* Sticky, so Close stays reachable on long stories */}
          <div className="dialog-bar">
            <button type="button" className="dialog-close" onClick={onClose}>
              Close ✕
            </button>
          </div>
          <div className="dialog-inner">{children}</div>
        </>
      )}
    </dialog>
  );
}
