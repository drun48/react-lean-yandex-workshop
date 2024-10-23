import { useMemo } from "react";
import { Ingredients } from "../types";
import CardIngredient from "../card-ingredients";
import styles from "./type-section.module.css";

type Props = {
  title: string;
  listIngredients: Array<Ingredients>;
  type: string;
  setActiveIngredient?: (value: Ingredients) => void;
};

function TypeSection({
  title,
  listIngredients,
  type,
  setActiveIngredient,
}: Props) {
  const listIngredientsType = useMemo(
    () => listIngredients.filter((item) => item.type === type),
    [listIngredients, type]
  );

  const handlerActive = (ingredient: Ingredients) => {
    if (setActiveIngredient) {
      setActiveIngredient(ingredient);
    }
  };

  return (
    <section>
      <h3 className="text text_type_main-medium">{title}</h3>
      <ul className={styles.container + " " + "ml-4 mt-6 mb-10"}>
        {listIngredientsType.map((ingredient) => (
          <li key={ingredient.id} onClick={() => handlerActive(ingredient)}>
            <CardIngredient
              data={ingredient}
              count={1 * Math.round(Math.random())}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TypeSection;
