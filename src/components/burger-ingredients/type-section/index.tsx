import { useMemo } from "react";
import CardIngredient from "../card-ingredients";
import styles from "./type-section.module.css";
import { set } from "../../../services/current-ingredient/slice";
import { Ingredients } from "../../../api/ingredients/types";
import { useAppDispatch } from "../../../services";

type Props = {
  title: string;
  listIngredients: Array<Ingredients>;
  type: string;
  handlerOpenModal?: (value: boolean) => void;
};

function TypeSection({
  title,
  listIngredients,
  type,
  handlerOpenModal,
}: Props) {
  const dispatch = useAppDispatch();

  const listIngredientsType = useMemo(
    () => listIngredients.filter((item) => item.type === type),
    [listIngredients, type]
  );

  const handlerActive = (ingredient: Ingredients) => {
    dispatch(set(ingredient));
    if (handlerOpenModal) {
      handlerOpenModal(true);
    }
  };

  return (
    <section>
      <h3 className="text text_type_main-medium">{title}</h3>
      <ul className={styles.container + " " + "ml-4 mt-6 mb-10"}>
        {listIngredientsType.map((ingredient) => (
          <li key={ingredient.id} onClick={() => handlerActive(ingredient)}>
            <CardIngredient data={ingredient} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TypeSection;
