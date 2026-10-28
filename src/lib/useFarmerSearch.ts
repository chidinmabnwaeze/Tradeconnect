import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFarmers } from "./services/farmers.service";
import { getErrorMessage } from "./getErrorMessage";
import type { Farmer } from "./types/farmer";

const PICKER_SIZE = 20;

// Farmer picker search, run on the backend so every farmer can be found —
// not just the first page the API returns. Pass enabled=false to hold off
// fetching until the picker is opened.
export function useFarmerSearch(search: string, enabled = true) {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search.trim());

  // Debounce the search box so it doesn't fire a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (!enabled) return;
    // Ignore responses that arrive after a newer search has started.
    let ignore = false;
    const fetchFarmers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getFarmers({
          per_page: PICKER_SIZE,
          search: debouncedSearch || undefined,
        });
        if (!ignore) setFarmers(response.data);
      } catch (err) {
        if (ignore) return;
        const message = getErrorMessage(err);
        setError(message);
        toast.error(message, { toastId: message });
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchFarmers();
    return () => {
      ignore = true;
    };
  }, [debouncedSearch, enabled]);

  return { farmers, loading, error };
}
