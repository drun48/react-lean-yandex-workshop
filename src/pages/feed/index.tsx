import { useEffect } from "react";
import OrderFeed from "../../components/order-feed";
import { useAppDispatch, useAppSelector } from "../../services";
import { getList } from "../../services/ingredients/actions";
import styles from "./feed.module.css";
import { feedConnect, feedDisconnect } from "../../services/feed/action";
import { feedOrders, feedTotal, feedTotalToday } from "../../services/feed/slice";

export default function Feed() {
  const dispatch = useAppDispatch();
  const total = useAppSelector(feedTotal);
  const totalToday = useAppSelector(feedTotalToday);
  const orders = useAppSelector(feedOrders)
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
        <OrderFeed list={orders}/>
      </div>
      <div className={styles['feed-statistics']}>
        <div>
          <h2 className="text_type_main-medium">Выполнено за все время:</h2>
          <p
            className={[styles["shadow-digit"], "text_type_digits-large"].join(
              " "
            )}
          >
            {total}
          </p>
        </div>
        <div>
          <h2 className="text_type_main-medium">Выполнено за сегодня:</h2>
          <p
            className={[styles["shadow-digit"], "text_type_digits-large"].join(
              " "
            )}
          >
            {totalToday}
          </p>
        </div>
      </div>
    </section>
  );
}
