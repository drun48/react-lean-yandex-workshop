import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useState } from "react";
import ModalBookingNotification from "./modal-booking-notification";

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
      {isOpenModal && <ModalBookingNotification handlerClose={setOpenModal} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "auto",
          }}
          className="mt-25 mb-10 scroll"
        >
          {data.map((el, index) => {
            const type =
              index === 0
                ? "top"
                : index === data.length - 1
                ? "bottom"
                : undefined;
            return (
              <div
                style={{ position: "relative" }}
                className="pl-8"
                key={index}
              >
                {!el.isLocked && (
                  <DragIcon type="primary" className={style.icon_drag} />
                )}
                <ConstructorElement {...el} type={type} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <p className="type text_type_digits-medium">610</p>
          <CurrencyIcon
            type="primary"
            className={style.icon + " " + "mr-10 ml-2"}
          />
          <Button htmlType="button" type="primary" size="medium" onClick={()=>{setOpenModal(true)}}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}

export default BurgerConstructor;
