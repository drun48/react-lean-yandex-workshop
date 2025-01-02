import { useEffect } from "react";
import OrderFeed from "../../components/order-feed";
import { useAppDispatch } from "../../services";
import { getList } from "../../services/ingredients/actions";
import styles from "./feed.module.css";

const mockData = [
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0944",
    ],
    _id: "",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0944",
    ],
    _id: "",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0944",
    ],
    _id: "",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0944",
    ],
    _id: "",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0944",
    ],
    _id: "",
    status: "done",
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
  },
];

export default function Feed() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);
  return (
    <section className={[styles["feed-page"], "pt-10"].join(" ")}>
      <div className={styles["feed-container"]}>
        <h1 className="text_type_main-large">Лента заказов</h1>
        <OrderFeed list={mockData} />
      </div>
      <div></div>
    </section>
  );
}
