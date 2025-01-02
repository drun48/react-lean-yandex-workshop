import CardFeed, { Order } from "../card-feed";
import styles from './order-feed.module.css'

type Props = {
  list: Array<Order>;
};

export default function OrderFeed({ list }: Props) {
  return (
    <ul className={[styles["order-feed-list"], "scroll"].join(" ")}>
      {list.map((card, index) => (
        <li key={index}>
          <CardFeed data={card} />
        </li>
      ))}
    </ul>
  );
}
