import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredients } from "../../../api/ingredients/types";
import styles from "../burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { DragType } from "../../../constants";
import { useAppDispatch } from "../../../services";
import { sortIngredient } from "../../../services/constructor-ingredients/slice";

type Props = {
  data: Ingredients;
  index: number;
  handleClose: () => void;
};

function DragConstructorElement({ data, index, handleClose }: Props) {
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag({
    type: DragType.CardIngredientConstructor,
    item: { index },
  });

  const [, dragDrop] = useDrop({
    accept: DragType.CardIngredientConstructor,
    drop(item: { index: number }) {
      dispatch(sortIngredient({ currentIndex: item.index, newIndex: index }));
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
