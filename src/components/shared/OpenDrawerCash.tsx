import { useEffect, useState } from "react";
import { useStore } from "@/store/store";

export default function OpenDrawerCash() {
  const openCashDrawer = useStore((state) => state.openCashDrawer);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (isTabActive) {
        if (event.key === "Delete") {
          openCashDrawer();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isTabActive]);

  return null;
}
