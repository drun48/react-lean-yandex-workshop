import { useMemo } from "react";
import { Ingredients } from "../../../api/ingredients/types";
import styles from "./show-ingredients.module.css";

type Props = {
  ingredients: Ingredients[];
  showCount?: number;
};

export default function ShowIngredients({ ingredients, showCount = 5 }: Props) {
  const outside = useMemo(
    () => (ingredients.length > showCount ? ingredients.length - showCount : 0),
    [ingredients, showCount]
  );
  return (
    <ul className={styles["show-ingredients"]}>
      {ingredients
        .slice(0, showCount)
        .reverse()
        .map((el, index) => {
          if (index === 0 && outside) {
            return (
              <li key={ingredients[showCount - 1].id}>
                <img src={ingredients[showCount - 1].image} />
                <div className={styles.outside}>
                  <p className="text_type_digits-default">+{outside}</p>
                </div>
              </li>
            );
          }
          return (
            <li key={el.id}>
              <img src={el.image} />
            </li>
          );
        })}
    </ul>
  );
}
