import AppHeader from "./components/app-header";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AppHeader />
      <main
        style={{ justifyContent: "center", gap: "40px" }}
        className="container"
      >
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
