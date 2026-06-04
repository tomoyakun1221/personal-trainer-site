import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { SiteSetting } from "../types";

let cache: SiteSetting | null = null;

export function useSiteSetting() {
  const [setting, setSetting] = useState<SiteSetting | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    api
      .getSiteSetting()
      .then((data) => {
        cache = data;
        setSetting(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    return api.getSiteSetting().then((data) => {
      cache = data;
      setSetting(data);
      return data;
    });
  };

  return { setting, loading, error, refresh };
}
