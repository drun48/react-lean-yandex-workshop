import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <div className="container-main">
      <AppHeader />
      <main className="container">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
