import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./history-order.module.css";

export default function HistoryOrderPage() {
  const [conainerFooter, setConainerFooter] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setConainerFooter(document.getElementById("profile-page-footer") ?? null);
  }, []);
  return (
    <>
      {conainerFooter &&
        createPortal(
          <p
            className={[
              styles["text-description"],
              "text_type_main-default",
              "text_color_inactive",
            ].join(" ")}
          >
            В этом разделе вы можете просмотреть свою историю заказов
          </p>,
          conainerFooter
        )}
    </>
  );
}
