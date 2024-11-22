import { useEffect } from "react";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details";
import { getList } from "../../services/ingredients/actions";
import { useAppDispatch } from "../../services";
import styles from "./ingredient-detail.module.css";

function IngredientsDetailPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <section className={styles["ingredient-detail"]}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientsDetailPage;
