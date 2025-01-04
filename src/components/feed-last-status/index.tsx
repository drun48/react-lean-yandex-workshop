import { useMemo } from "react";
import { useAppSelector } from "../../services";
import { feedOrders } from "../../services/feed/slice";
import { Status } from "../../types/order";
import styles from "./feed-last-status.module.css";

export default function FeedLastStatus() {
  const orders = useAppSelector(feedOrders);
  const numberPending = useMemo(
    () =>
      orders
        .filter((el) => el.status === Status.pending)
        .slice(0, 14)
        .map((el) => el.number),
    [orders]
  );

  const numberDone = useMemo(
    () =>
      orders
        .filter((el) => el.status === Status.done)
        .slice(0, 14)
        .map((el) => el.number),
    [orders]
  );
  return (
    <div className={styles["feed-status"]}>
      <div className={styles["list-number-container"]}>
        <p className="text_type_main-medium">Готовы:</p>
        <ul className={styles["list-number"]}>
          {numberDone.map((el) => (
            <li key={el} className="text_type_digits-default text-done">
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["list-number-container"]}>
        <p className="text_type_main-medium">В работе:</p>
        <ul className={styles["list-number"]}>
          {numberPending.map((el) => (
            <li key={el} className="text_type_digits-default">
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
