import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";

function App() {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AppHeader />
      <div
        style={{ justifyContent: "center", gap: "40px" }}
        className="container"
      >
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
}

export default App;
