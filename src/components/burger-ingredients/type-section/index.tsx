import { useMemo } from "react";
import CardIngredient from "../card-ingredients";
import styles from "./type-section.module.css";
import { Ingredients } from "../../../api/ingredients/types";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title: string;
  listIngredients: Array<Ingredients>;
  type: string;
};

function TypeSection({ title, listIngredients, type }: Props) {
  const location = useLocation();

  const listIngredientsType = useMemo(
    () => listIngredients.filter((item) => item.type === type),
    [listIngredients, type]
  );

  return (
    <section data-type={type}>
      <h3 className="text text_type_main-medium">{title}</h3>
      <ul className={styles.container + " " + "ml-4 mt-6 mb-10"}>
        {listIngredientsType.map((ingredient) => (
          <li key={ingredient.id}>
            <Link
              to={`/ingredients/${ingredient.id}`}
              state={{ backgroundLocation: location }}
            >
              <CardIngredient data={ingredient} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TypeSection;
