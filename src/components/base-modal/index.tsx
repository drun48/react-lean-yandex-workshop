import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./base-modal.module.css";
import { HandlerClose } from "./type";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ModalOverlay from "./modal-overlay";

type Props = {
  title?: string;
  children?: React.ReactNode;
  handlerClose?: HandlerClose;
};

function BaseModal({ children, title, handlerClose }: Props) {
  const handlerClickOverlay = () => {
    if (handlerClose) {
      handlerClose(false);
    }
  };

  useEffect(() => {
    const handlerKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      handlerClickOverlay();
    };
    window.addEventListener("keydown", handlerKey);
    return () => {
      window.removeEventListener("keydown", handlerKey);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClick={handlerClickOverlay} />
      <article className={style.modal + " " + "p-10"}>
        {title ? (
          <div className={style.dialog_title}>
            <h3 className="text_type_main-large">{title}</h3>
            <div  onClick={handlerClickOverlay} data-testid="modal-icon-close">
              <CloseIcon
                type="primary"
                className={style.close_icon}
              />
            </div>
          </div>
        ) : (
          <CloseIcon
            type="primary"
            className={[style.only_close, style.close_icon].join(" ")}
            onClick={handlerClickOverlay}
          />
        )}
        {children}
      </article>
    </>,
    document.getElementById("modals") ?? document.body
  );
}

export default BaseModal;
