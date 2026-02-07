import { useEffect, useState } from "react";
import { ensureAnonymousSession } from "../services/anonymousSession";

export function useAnonymousSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureAnonymousSession().then((id) => {
      setSessionId(id);
      setLoading(false);
    });
  }, []);

  return {
    sessionId,
    loading,
  };
}