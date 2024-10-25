import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useRef, useState } from "react";
import OrderDetails from "./order-details";
import BaseModal from "../base-modal";

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);
  const bun = useRef({
    isLocked: true,
    text: "Краторная булка N-200i",
    price: 1255,
    thumbnail: "https://code.s3.yandex.net/react/code/bun-02.png",
  });
  const data = [
    {
      isLocked: false,
      text: "Соус Spicy-X",
      price: 90,
      thumbnail: "https://code.s3.yandex.net/react/code/sauce-02.png",
    },
    {
      isLocked: false,
      text: "Говяжий метеорит (отбивная)",
      price: 3000,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-04.png",
    },
    {
      isLocked: false,
      text: "Хрустящие минеральные кольца",
      price: 300,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: false,
      text: "Говяжий метеорит (отбивная)",
      price: 3000,
      thumbnail: "https://code.s3.yandex.net/react/code/meat-04.png",
    },
    {
      isLocked: false,
      text: "Хрустящие минеральные кольца",
      price: 300,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: false,
      text: "Соус Spicy-X",
      price: 90,
      thumbnail: "https://code.s3.yandex.net/react/code/sauce-02.png",
    },
  ];
  return (
    <>
      {isOpenModal && (
        <BaseModal handlerClose={setOpenModal}>
          <OrderDetails />
        </BaseModal>
      )}
      <div className={[styles["burger-constructor"], "mt-25"].join(" ")}>
        <div
          className={[styles["burger-constructor__list"], "mb-10"].join(" ")}
        >
          <div className="pl-8">
            <ConstructorElement
              {...bun.current}
              type="top"
              text={bun.current.text + " (верх)"}
            />
          </div>
          <ul
            className={[styles["burger-constructor__list"], "scroll"].join(" ")}
          >
            {data.map((el, index) => {
              return (
                <li className="pl-8" key={index}>
                  {!el.isLocked && (
                    <DragIcon type="primary" className={styles["icon-drag"]} />
                  )}
                  <ConstructorElement {...el} />
                </li>
              );
            })}
          </ul>
          <div className="pl-8">
            <ConstructorElement
              {...bun.current}
              type="bottom"
              text={bun.current.text + " (низ)"}
            />
          </div>
        </div>
        <div className={styles["burger-constructor__order"]}>
          <p className="type text_type_digits-medium">610</p>
          <CurrencyIcon
            type="primary"
            className={styles.icon + " " + "mr-10 ml-2"}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}

export default BurgerConstructor;
