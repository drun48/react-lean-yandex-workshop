import IngredientDetails from "../../components/burger-ingredients/ingredient-details";
import styles from "./ingredient-detail.module.css";

function IngredientsDetailPage() {
  return (
    <section className={styles["ingredient-detail"]}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientsDetailPage;
