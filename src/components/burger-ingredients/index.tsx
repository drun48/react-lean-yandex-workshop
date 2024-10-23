import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TypeSection from "./type-section";
import { Ingredients } from "./types";
import { useEffect, useState } from "react";
import IngredientDetails from "./ingredient-details";
import Loader from "../loader";

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
        const res = await fetch(
          "https://norma.nomoreparties.space/api/ingredients"
        );
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
        console.error(e)
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
      {isLoading && <Loader/>}
      {isOpenModal && activeIngredient && (
        <IngredientDetails
          data={activeIngredient}
          handlerClose={setOpenModal}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          maxWidth: "600px",
        }}
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
        <div
          style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
          className="mt-10 scroll"
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
