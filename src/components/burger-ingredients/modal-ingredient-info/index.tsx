import BaseModal from "../../base-modal";
import { HandlerClose } from "../../base-modal/type";
import { Ingredients } from "../types";

type Props = {
  data: Ingredients;
  handlerClose?: HandlerClose;
};

const info = [
  { key: "calories", title: "Калории,ккал" },
  { key: "proteins", title: "Белки, г" },
  { key: "fat", title: "Жиры, г" },
  { key: "carbohydrates", title: "Углеводы, г" },
];

function ModalIngredientInfo({ data, handlerClose }: Props) {
  return (
    <BaseModal handlerClose={handlerClose} title="Детали ингредиента">
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <img src={data.image_large} className="mb-4"/>
        <p className="text_type_main-medium">{data.name}</p>
        <div style={{display:'flex', gap:'20px'}} className="mt-8">
          {info.map((item) => (
            <div className="disabled" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'8px'}}>
              <p className="text_type_main-default">{item.title}</p>
              <p className="text_type_digits-default">{(data as Record<string, string | number>)[item.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}

export default ModalIngredientInfo;
