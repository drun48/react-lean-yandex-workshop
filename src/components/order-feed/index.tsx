import { useAppSelector } from "../../services";
import { feedOrders } from "../../services/feed/slice";
import CardFeed from "../card-feed";
import styles from './order-feed.module.css'

export default function OrderFeed() {
  const orders = useAppSelector(feedOrders)
  return (
    <ul className={[styles["order-feed-list"], "scroll"].join(" ")}>
      {orders.map((card) => (
        <li key={card.id}>
          <CardFeed data={card} />
        </li>
      ))}
    </ul>
  );
}
