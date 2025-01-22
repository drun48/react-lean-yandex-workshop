import { Link, useLocation } from "react-router-dom";
import { Order } from "../../types/order";
import CardFeed from "../card-feed";
import styles from "./order-feed.module.css";
import { useMemo } from "react";

type Props = {
  list: Order[];
  isShowStatus?: boolean;
};

export default function OrderFeed({ list, isShowStatus }: Props) {
  const location = useLocation();

  const url = useMemo(() => {
    if (location.pathname.includes("profile")) return "/profile/orders";
    else if (location.pathname.includes("feed")) return "/feed";
    else return "";
  }, [location]);

  return (
    <ul className={[styles["order-feed-list"], "scroll"].join(" ")}>
      {list.map((card) => (
        <li key={card.id}>
          <Link
            to={`${url}/${card.number}`}
            state={{ backgroundLocation: location }}
            className=""
          >
            <CardFeed data={card} isShowStatus={isShowStatus} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
