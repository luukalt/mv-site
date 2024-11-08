// hooks/useAnalytics.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase";

const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (analytics) {
        logEvent(analytics, "page_view", { page_path: url });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default useAnalytics;
