import image from "../../../assets/img/done.svg";
import { useAppSelector } from "../../../services";
import { getOrder } from "../../../services/order/slice";
import getNumberRank from "../../../utils/getNumberRank";
import styles from "./order-details.module.css";

function OrderDetails() {
  const order = useAppSelector(getOrder);

  return (
    <div className={[styles["order-details"], "pt-20", "pb-20"].join(" ")}>
      {typeof order === "number" && (
        <h2 className="text_type_digits-large mt-8" data-testid="order-number">
          {getNumberRank(order, 6)}
        </h2>
      )}
      <p className="text_type_main-default">идентификатор заказа</p>
      <img src={image} className="mt-15 mb-15" alt="Иконка заказа" />
      <p className="text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text_type_main-default disabled">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
