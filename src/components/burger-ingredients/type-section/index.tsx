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
      <div className={styles.container + " " + "ml-4 mt-6 mb-10"}>
        {listIngredientsType.map((ingredient) => (
          <ul onClick={() => handlerActive(ingredient)}>
            <li>
              <CardIngredient
                data={ingredient}
                key={ingredient.id}
                count={1 * Math.round(Math.random())}
              />
            </li>
          </ul>
        ))}
      </div>
    </section>
  );
}

export default TypeSection;
