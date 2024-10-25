import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TypeSection from "./type-section";
import { Ingredients } from "./types";
import { useEffect, useState } from "react";
import IngredientDetails from "./ingredient-details";
import Loader from "../loader";
import { apiURL } from "../../constants";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Array<Ingredients>>([]);

  const [current, setCurrent] = useState<string>("");

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [activeIngredient, setActiveIngredient] = useState<Ingredients | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${apiURL}/api/ingredients`);
        const data = (await res.json()).data;
        setLoading(false);
        setIngredients(
          data.map((item: Ingredients & { _id: string }) => ({
            id: item._id,
            name: item.name,
            type: item.type,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates,
            calories: item.calories,
            price: item.price,
            image: item.image,
            image_large: item.image_large,
          }))
        );
      } catch (e) {
        setLoading(false);
        setIngredients([]);
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (activeIngredient) {
      setOpenModal(true);
    }
  }, [activeIngredient]);
  return (
    <>
      {isLoading && <Loader />}
      {isOpenModal && activeIngredient && (
        <IngredientDetails
          data={activeIngredient}
          handlerClose={setOpenModal}
        />
      )}
      <div className={[styles["burger-ingredients"], "pt-10"].join(" ")}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <div className={[styles["burger-ingredients__tubs"], "mt-5"].join(" ")}>
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
        <div
          className={[
            styles["burger-ingredients__items"],
            "mt-10",
            "scroll",
          ].join(" ")}
        >
          <TypeSection
            listIngredients={ingredients}
            title="Булки"
            type="bun"
            setActiveIngredient={setActiveIngredient}
          />
          <TypeSection
            listIngredients={ingredients}
            title="Соусы"
            type="sauce"
            setActiveIngredient={setActiveIngredient}
          />
          <TypeSection
            listIngredients={ingredients}
            title="Начинки"
            type="main"
            setActiveIngredient={setActiveIngredient}
          />
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
