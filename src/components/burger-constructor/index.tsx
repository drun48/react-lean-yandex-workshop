import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useState } from "react";
import OrderDetails from "./order-details";

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);
  const data = [
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: false,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: false,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: false,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
    {
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 200,
      thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    },
  ];
  return (
    <>
      {isOpenModal && <OrderDetails handlerClose={setOpenModal} />}
      <div className={styles["burger-constructor"]}>
        <ul
          className={[
            styles["burger-constructor__list"],
            "mt-25",
            "mb-10",
            "scroll",
          ].join(" ")}
        >
          {data.map((el, index) => {
            const type =
              index === 0
                ? "top"
                : index === data.length - 1
                ? "bottom"
                : undefined;
            return (
              <li className="pl-8" key={index}>
                {!el.isLocked && (
                  <DragIcon type="primary" className={styles["icon-drag"]} />
                )}
                <ConstructorElement {...el} type={type} />
              </li>
            );
          })}
        </ul>
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
