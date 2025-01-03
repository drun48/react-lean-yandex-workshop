import { Order } from "../../types/Order";
import CardFeed from "../card-feed";
import styles from "./order-feed.module.css";

type Props = {
  list: Order[];
  isShowStatus?:boolean
};

export default function OrderFeed({ list, isShowStatus }: Props) {
  return (
    <ul className={[styles["order-feed-list"], "scroll"].join(" ")}>
      {list.map((card) => (
        <li key={card.id}>
          <CardFeed data={card} isShowStatus={isShowStatus}/>
        </li>
      ))}
    </ul>
  );
}
