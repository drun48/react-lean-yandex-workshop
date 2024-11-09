import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { getCurrentIngredient } from "../../../services/current-ingredient/slice";

const info = [
  { key: "calories", title: "Калории,ккал" },
  { key: "proteins", title: "Белки, г" },
  { key: "fat", title: "Жиры, г" },
  { key: "carbohydrates", title: "Углеводы, г" },
];

function IngredientDetails() {
  const data = useSelector(getCurrentIngredient)
  return (
    <div className={styles["ingredient-details"]}>
      <img src={data?.image_large} className="mb-4" alt="Икона ингредиента"/>
      <p className="text_type_main-medium">{data?.name}</p>
      <ul className={[styles["ingredient-details__list"], "mt-8"].join(" ")}>
        {info.map((item, index) => (
          <li key={index} className={styles["list__item"]}>
            <p className="text_type_main-default">{item.title}</p>
            <p className="text_type_digits-default">
              {(data as Record<string, string | number>)?.[item.key]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientDetails;
