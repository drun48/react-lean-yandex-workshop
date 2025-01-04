import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card-ingredients.module.css";
import { useDrag } from "react-dnd";
import { DragType } from "../../../constants";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getConstructorIngredient } from "../../../services/constructor-ingredients/slice";
import { Ingredients } from "../../../types/ingredients";

type Props = {
  data: Pick<Ingredients, "id" | "name" | "price" | "image" | "type">;
};

function CardIngredient({ data }: Props) {
  const [, drag] = useDrag({
    type: DragType.CardIngredient,
    item: data,
  });
  const { list, bun } = useSelector(getConstructorIngredient);

  const count = useMemo(() => {
    if (data.type === "bun") {
      return data.id === bun?.id ? 2 : 0;
    }
    return list.reduce((res, el) => {
      if (el.id === data.id) res++;
      return res;
    }, 0);
  }, [data.type, data.id, list, bun?.id]);

  return (
    <article className={styles.card} ref={drag}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={data.image} className="pl-4 pr-4" alt="Икона ингредиента"/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </article>
  );
}

export default CardIngredient;
