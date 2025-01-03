import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getIngredientsByArrayId } from "../../services/ingredients/slice";
import { getSum } from "../../utils/getSum";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { getOrderCurrentOrderByNumber } from "../../services/order/slice";
import { getOrderById } from "../../services/order/actions";
import { getList } from "../../services/ingredients/actions";
import { Status, StatusRussia } from "../../types/order";
import styles from "./order-detail-ingredient.module.css";
import getNumberRank from "../../utils/getNumberRank";

export default function OrderDetailIngredient() {
  const params = useParams() as { number: string };
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) =>
    getOrderCurrentOrderByNumber({
      order: state.order,
      number: Number(params.number),
    })
  );

  useEffect(() => {
    dispatch(getList());
    if (!order) {
      dispatch(getOrderById(params.number));
    }
  }, []);

  const countIngredients = useMemo(() => {
    return (
      order?.ingredients?.reduce((res, el) => {
        if (!res[el]) {
          res[el] = 0;
        }
        res[el]++;
        return res;
      }, {} as Record<string, number>) ?? {}
    );
  }, [order]);

  const ingredients = useAppSelector((state) =>
    getIngredientsByArrayId({
      ingredients: state.ingredients,
      ids: Object.keys(countIngredients),
    })
  );

  const sumOrder = useMemo(() => {
    return getSum(ingredients, "price");
  }, [ingredients]);

  if (!order) {
    return <></>;
  }

  return (
    <section className={styles["order-detail"]}>
      <h3
        className={[
          styles["order-detail__number"],
          "text_type_digits-default",
        ].join(" ")}
      >
        #{getNumberRank(order.number, 6)}
      </h3>
      <div className={styles["order-detail__title"]}>
        <h2 className="text_type_main-medium">{order.name}</h2>
        <p
          className={[
            order.status === Status.done ? styles.done : "",
            "text_type_main-default",
          ].join(" ")}
        >
          {StatusRussia[order.status]}
        </p>
      </div>
      <div className={styles["order-detail__container-ingredient"]}>
        <p className="text_type_main-medium">Состав:</p>
        <ul className={styles["order-ingredient"]}>
          {ingredients.map((el) => {
            return (
              <li key={el.id} className={styles["order-ingredient__item"]}>
                <div className="photo-gradient-order">
                  <img src={el.image} />
                </div>
                <p
                  className={[
                    styles["order-ingredient__item__title"],
                    "text_type_main-default",
                  ].join(" ")}
                >
                  {el.name}
                </p>
                <div className={styles["price"]}>
                  <p className="text_type_digits-default">
                    {countIngredients[el.id]} X {el.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles['order-detail__info']}>
        <FormattedDate
          className="text_type_main-default disabled"
          date={new Date(order.createdAt)}
        />
        <div className={styles["price"]}>
          <p className="text_type_digits-default">{sumOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}
