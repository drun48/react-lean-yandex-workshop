import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services";
import { getIngredientsByArrayId } from "../../services/ingredients/slice";
import { useMemo } from "react";
import styles from "./card-feed.module.css";
import ShowIngredients from "./show-ingredients";

import getNumberRank from "../../utils/getNumberRank";
import uuid4 from "uuid4";
import { Order, Status, StatusRussia } from "../../types/order";
import { getSum } from "../../utils/getSum";

type Props = {
  data: Order;
  isShowStatus?: boolean;
};

export default function CardFeed({ data, isShowStatus = false }: Props) {
  const ingredients = useAppSelector((state) =>
    getIngredientsByArrayId({
      ingredients: state.ingredients,
      ids: data.ingredients,
    })
  );

  const ingredientsUnicId = useMemo(
    () => ingredients.map((el) => ({ ...el, uniqueId: uuid4() })),
    [ingredients]
  );

  const sumOrder = useMemo(() => {
    return getSum(ingredients, "price");
  }, [ingredients]);

  return (
    <article className={styles.card}>
      <header>
        <div>
          <h3 className="text_type_digits-default">
            #{getNumberRank(data.number, 6)}
          </h3>
          {isShowStatus && (
            <p
              className={[
                data.status === Status.done ? 'text-done' : "",
                "text_type_main-default",
              ].join(" ")}
            >
              {StatusRussia[data.status]}
            </p>
          )}
        </div>
        <FormattedDate
          className="text_type_main-default disabled"
          date={new Date(data.createdAt)}
        />
      </header>
      <h2 className="text_type_main-medium">{data.name}</h2>
      <div className={[styles["card-content"]].join(" ")}>
        <div className={[styles["card-content-ingredient"]].join(" ")}>
          <ShowIngredients ingredients={ingredientsUnicId} showCount={6} />
        </div>
        <div className={[styles["card-content-price"]].join(" ")}>
          <p className="text_type_digits-default">{sumOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}
