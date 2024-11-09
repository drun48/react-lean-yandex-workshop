import image from "../../../assets/img/done.svg";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";
import { getState } from "../../../services/order/slice";
import Loader from "../../loader";

function OrderDetails() {
  const { order, loading } = useSelector(getState);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={[styles["order-details"], "pt-20", "pb-20"].join(" ")}>
      <h2 className="text_type_digits-large mt-8">{order}</h2>
      <p className="text_type_main-default">идентификатор заказа</p>
      <img src={image} className="mt-15 mb-15" />
      <p className="text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text_type_main-default disabled">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
