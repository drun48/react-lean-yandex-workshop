import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TypeSection from "./type-section";
import { Ingredients } from "./types";
import { useState } from "react";

type Props = {
  listIngredients: Array<Ingredients>;
};

function BurgerIngredients({ listIngredients }: Props) {
  const [current, setCurrent] = useState<string>("");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", height:'80vh', maxWidth:'600px' }}
      className="pt-10"
    >
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }} className="mt-5">
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div style={{display:'flex', flexDirection:'column', overflow:'auto'}} className="mt-10">
        <TypeSection
          listIngredients={listIngredients}
          title="Булки"
          type="bun"
        />
        <TypeSection
          listIngredients={listIngredients}
          title="Соусы"
          type="sauce"
        />
        <TypeSection
          listIngredients={listIngredients}
          title="Начинки"
          type="main"
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;
