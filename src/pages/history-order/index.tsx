import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./history-order.module.css";
import OrderFeed from "../../components/order-feed";
import { useAppDispatch, useAppSelector } from "../../services";
import { profileOrders } from "../../services/profile-order/slice";
import {
  profileOrderConnect,
  profileOrderDisconnect,
} from "../../services/profile-order/action";
import { getList } from "../../services/ingredients/actions";

export default function HistoryOrderPage() {
  const dispatch = useAppDispatch();
  const [conainerFooter, setConainerFooter] = useState<HTMLElement | null>(
    null
  );
  const orders = useAppSelector(profileOrders);

  useEffect(() => {
    setConainerFooter(document.getElementById("profile-page-footer") ?? null);
    dispatch(getList());
    dispatch(profileOrderConnect());
    return () => {
      dispatch(profileOrderDisconnect());
    };
  }, [dispatch]);
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
      <OrderFeed list={orders} isShowStatus={true}/>
    </>
  );
}
