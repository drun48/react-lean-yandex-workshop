import { useMemo } from "react";
import { Ingredients } from "../types";
import CardIngredient from "../card-ingredients";
import styles from './type-section.module.css'

type Prop = {
  title: string;
  listIngredients: Array<Ingredients>;
  type: string;
};

function TypeSection({ title, listIngredients, type }: Prop) {
  const listIngredientsType = useMemo(
    () => listIngredients.filter((item) => item.type === type),
    [listIngredients, type]
  );
  return (
    <section >
      <h3 className="text text_type_main-medium">{title}</h3>
      <div className={styles.container + ' ' + 'ml-4 mt-6 mb-10'}>
        {listIngredientsType.map((ingredient) => (
          <CardIngredient data={ingredient} key={ingredient.id} />
        ))}
      </div>
    </section>
  );
}

export default TypeSection;
