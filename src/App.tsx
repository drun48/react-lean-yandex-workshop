import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";

function App() {
  return (
    <div className="container-main">
      <AppHeader />
      <main className="container">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
