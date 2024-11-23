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
import { useSelector } from "react-redux";
import {
  addIngredient,
  clearContructor,
  ConstructorItem,
  deleteIngredient,
  getConstructorIngredient,
} from "../../services/constructor-ingredients/slice";
import { Ingredients } from "../../api/ingredients/types";
import { useAppDispatch } from "../../services";
import DragConstructorElement from "./drag-constroctor-element";
import { createOrder } from "../../services/order/actions";
import { getError, getLoading } from "../../services/order/slice";
import Loader from "../loader";
import { getUser } from "../../services/user/slice";
import { useLocation, useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const { bun, list } = useSelector(getConstructorIngredient);
  const loadingOrder = useSelector(getLoading);
  const errorOrder = useSelector(getError);
  const user = useSelector(getUser);
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
    const sum = list.reduce((res, el) => {
      res += el.price;
      return res;
    }, 0);
    return sum + (bun?.price ?? 0) * 2;
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
