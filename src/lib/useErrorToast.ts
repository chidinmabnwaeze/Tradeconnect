import { useEffect } from "react";
import { toast } from "react-toastify";

// Mirrors a page's inline error as a toast, so it's seen even when the
// message box is scrolled out of view. toastId stops duplicates of the
// same message stacking up.
export function useErrorToast(error: string | null | undefined) {
  useEffect(() => {
    if (error) toast.error(error, { toastId: error });
  }, [error]);
}
