import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { handleApiError } from "../services/api/auth";
import { AxiosError } from "axios";

type Status = "idle" | "loading" | "success" | "error";

interface UseFetchResult<T> {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  error: string | null;
  loading: boolean;
  refetch: () => void;
  status: Status;
}

export function useFetch<T>(
  fn: () => Promise<T | null>,
  deps: React.DependencyList = []
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<Status>("idle");
  const [trigger, setTrigger] = useState(0); // to re-trigger

  const fetchData = useCallback(async () => {
    setLoading(true);
    setStatus("loading");
    setError(null);

    try {
      const result = await fn();
      setData(result);
      setStatus("success");
    } catch (err) {
      if (err instanceof AxiosError) {
        const apiError = handleApiError(err);
        setError(apiError.message);
      }
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData, trigger]);

  const refetch = () => setTrigger((prev) => prev + 1);

  return { data, setData, error, loading, refetch, status };
}
