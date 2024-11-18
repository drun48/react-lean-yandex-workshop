import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients";
import { DndProvider } from "react-dnd";

function BurgerConstructorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
}

export default BurgerConstructorPage;
