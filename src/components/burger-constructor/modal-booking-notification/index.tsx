import BaseModal from "../../base-modal";
import image from '../../../assets/img/done.svg'
import { HandlerClose } from "../../base-modal/type";

type Props = {
  handlerClose?:HandlerClose
};

function ModalBookingNotification({ handlerClose }: Props) {
  return (
    <BaseModal handlerClose={handlerClose}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} className="pt-20 pb-20">
        <h2 className="text_type_digits-large mt-8">034536</h2>
        <p className="text_type_main-default">идентификатор заказа</p>
        <img src={image} className="mt-15 mb-15"/>
        <p className="text_type_main-default mb-2">Ваш заказ начали готовить</p>
        <p className="text_type_main-default disabled">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </BaseModal>
  );
}

export default ModalBookingNotification;
