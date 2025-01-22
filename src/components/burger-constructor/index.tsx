import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useCallback, useMemo, useState } from "react";
import OrderDetails from "./order-details";
import BaseModal from "../base-modal";
import { useDrop } from "react-dnd";
import { DragType } from "../../constants";
import {
  addIngredient,
  ConstructorItem,
  deleteIngredient,
  getConstructorIngredient,
} from "../../services/constructor-ingredients/slice";
import { useAppDispatch, useAppSelector } from "../../services";
import DragConstructorElement from "./drag-constroctor-element";
import { createOrder } from "../../services/order/actions";
import { getError, getLoading } from "../../services/order/slice";
import Loader from "../loader";
import { getUser } from "../../services/user/slice";
import { useLocation, useNavigate } from "react-router-dom";
import { getSum } from "../../utils/getSum";
import { Ingredients } from "../../types/ingredients";

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const { bun, list } = useAppSelector(getConstructorIngredient);
  const loadingOrder = useAppSelector(getLoading);
  const errorOrder = useAppSelector(getError);
  const user = useAppSelector(getUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [, refDrop] = useDrop(() => ({
    accept: DragType.CardIngredient,
    drop(ingredient: Ingredients) {
      dispatch(addIngredient(ingredient));
    },
  }));

  const handlerDelete = useCallback(
    (ingredient: ConstructorItem) => {
      return () => {
        dispatch(deleteIngredient(ingredient));
      };
    },
    [dispatch]
  );

  const sumOrder = useMemo(() => {
    return getSum(list, "price") + (bun?.price ?? 0) * 2;
  }, [list, bun]);

  const openOrder = useCallback(() => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }
    dispatch(createOrder());
    setOpenModal(true);
  }, [dispatch, location, navigate, user]);
  return (
    <>
      {loadingOrder && <Loader />}
      {isOpenModal && !errorOrder && !loadingOrder && (
        <BaseModal handlerClose={setOpenModal}>
          <OrderDetails />
        </BaseModal>
      )}
      <div
        className={[styles["burger-constructor"], "mt-25"].join(" ")}
        ref={refDrop}
      >
        <div
          className={[styles["burger-constructor__list"], "mb-10"].join(" ")}
        >
          <div className="pl-8">
            {bun && (
              <ConstructorElement
                isLocked={true}
                type="top"
                thumbnail={bun?.image}
                price={bun.price}
                text={bun?.name + " (верх)"}
              />
            )}
          </div>
          <ul
            className={[styles["burger-constructor__list"], "scroll"].join(" ")}
          >
            {list.map((el) => {
              return (
                <li className="pl-8" key={el.uniqueId}>
                  <DragConstructorElement
                    data={el}
                    handleClose={handlerDelete(el)}
                  />
                </li>
              );
            })}
          </ul>
          <div className="pl-8">
            {bun && (
              <ConstructorElement
                isLocked={true}
                type="bottom"
                thumbnail={bun?.image}
                price={bun.price}
                text={bun?.name + " (вниз)"}
              />
            )}
          </div>
        </div>
        {!!sumOrder && (
          <div className={styles["burger-constructor__order"]}>
            <p className="type text_type_digits-medium">{sumOrder}</p>
            <CurrencyIcon
              type="primary"
              className={styles.icon + " " + "mr-10 ml-2"}
            />
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={openOrder}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default BurgerConstructor;
