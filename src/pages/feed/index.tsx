import { useEffect } from "react";
import OrderFeed from "../../components/order-feed";
import { useAppDispatch } from "../../services";
import { getList } from "../../services/ingredients/actions";
import styles from "./feed.module.css";
import { feedConnect, feedDisconnect } from "../../services/feed/action";

export default function Feed() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getList());
    dispatch(feedConnect());
    return () => {
      dispatch(feedDisconnect());
    };
  }, [dispatch]);
  return (
    <section className={[styles["feed-page"], "pt-10"].join(" ")}>
      <div className={styles["feed-container"]}>
        <h1 className="text_type_main-large">Лента заказов</h1>
        <OrderFeed />
      </div>
      <div></div>
    </section>
  );
}
