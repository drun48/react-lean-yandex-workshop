import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services";
import { getIngredientsByArrayId } from "../../services/ingredients/slice";
import { useMemo } from "react";
import styles from "./card-feed.module.css";
import ShowIngredients from "./show-ingredients";
import { Order } from "../../services/feed/slice";
import getNumberRank from "../../utils/getNumberRank";

type Props = {
  data: Order;
};

export default function CardFeed({ data }: Props) {
  const ingredients = useAppSelector((state) =>
    getIngredientsByArrayId({
      ingredients: state.ingredients,
      ids: data.ingredients,
    })
  );

  const sumOrder = useMemo(() => {
    const sum = ingredients.reduce((res, el) => {
      res += el.price;
      return res;
    }, 0);
    return sum;
  }, [ingredients]);

  return (
    <article className={styles.card}>
      <header>
        <h3 className="text_type_digits-default">#{getNumberRank(data.number, 6)}</h3>
        <FormattedDate
          className="text_type_main-default disabled"
          date={new Date(data.createdAt)}
        />
      </header>
      <h2 className="text_type_main-medium">{data.name}</h2>
      <div className={[styles["card-content"]].join(" ")}>
        <div className={[styles["card-content-ingredient"]].join(" ")}>
          <ShowIngredients ingredients={ingredients} showCount={6}/>
        </div>
        <div className={[styles["card-content-price"]].join(" ")}>
          <p className="type text_type_digits-default">{sumOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}
