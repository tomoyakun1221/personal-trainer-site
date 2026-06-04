import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { STATIC_SITE_SETTING } from "../constants/siteSetting";
import type { SiteSetting } from "../types";

const isStaticSite = import.meta.env.VITE_STATIC_SITE === "true";

let cache: SiteSetting | null = isStaticSite ? STATIC_SITE_SETTING : null;

export function useSiteSetting() {
  const [setting, setSetting] = useState<SiteSetting | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    if (isStaticSite) {
      cache = STATIC_SITE_SETTING;
      setSetting(STATIC_SITE_SETTING);
      setLoading(false);
      return;
    }
    api
      .getSiteSetting()
      .then((data) => {
        cache = data;
        setSetting(data);
      })
      .catch((e) => {
        cache = STATIC_SITE_SETTING;
        setSetting(STATIC_SITE_SETTING);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    if (isStaticSite) {
      setSetting(STATIC_SITE_SETTING);
      return Promise.resolve(STATIC_SITE_SETTING);
    }
    return api.getSiteSetting().then((data) => {
      cache = data;
      setSetting(data);
      return data;
    });
  };

  return { setting, loading, error, refresh };
}
