import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { DragType } from "../../../constants";
import { useAppDispatch } from "../../../services";
import {
  ConstructorItem,
  sortIngredient,
} from "../../../services/constructor-ingredients/slice";

type Props = {
  data: ConstructorItem;
  handleClose: () => void;
};

function DragConstructorElement({ data, handleClose }: Props) {
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag({
    type: DragType.CardIngredientConstructor,
    item: { data },
  });

  const [, dragDrop] = useDrop({
    accept: DragType.CardIngredientConstructor,
    drop(item: { data: ConstructorItem }) {
      dispatch(
        sortIngredient({ currentElement: item.data, offsetElement: data })
      );
    },
  });
  return (
    <div
      ref={(el) => {
        dragRef(el);
        dragDrop(el);
      }}
    >
      <DragIcon type="primary" className={styles["icon-drag"]} />
      <ConstructorElement
        thumbnail={data.image}
        price={data.price}
        text={data.name}
        handleClose={handleClose}
      />
    </div>
  );
}

export default DragConstructorElement;
