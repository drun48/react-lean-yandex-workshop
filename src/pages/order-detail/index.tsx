import OrderDetailIngredient from "../../components/order-detail-ingredient";
import styles from "./order-detail.module.css";

export default function OrderDetail() {
  return (
    <div className={styles["container"]}>
      <OrderDetailIngredient />
    </div>
  );
}
