import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./base-modal.module.css";
import { HandlerClose } from "./type";

type Prop = {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  handlerClose?: HandlerClose
};

function BaseModal({ children, title, handlerClose }: Prop) {
  const handlerClickOverlay = () => {
    if (handlerClose) {
      handlerClose(false);
    }
  };
  return (
    <>
      <div className="overlay" onClick={handlerClickOverlay} />
      <article className={style.modal + " " + "p-10"}>
        {title ? (
          <div className={style.dialog_title}>
            <h3 className="text_type_main-large">{title}</h3>
            <CloseIcon type="primary" className={style.close_icon} onClick={handlerClickOverlay}/>
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
    </>
  );
}

export default BaseModal;
