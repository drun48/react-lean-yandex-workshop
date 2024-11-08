import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TypeSection from "./type-section";
import { useEffect, useState } from "react";
import IngredientDetails from "./ingredient-details";
import Loader from "../loader";
import styles from "./burger-ingredients.module.css";
import BaseModal from "../base-modal";
import { getStateIngredients } from "../../services/ingredients/slice";
import { getList } from "../../services/ingredients/actions";
import { useAppDispatch, useAppSelector } from "../../services";

function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { list: ingredients, loading: isLoading } =
  useAppSelector(getStateIngredients);

  const [currentTab, setCurrentTab] = useState<string>("");
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {isOpenModal && (
        <BaseModal handlerClose={setOpenModal} title="Детали ингредиента">
          <IngredientDetails />
        </BaseModal>
      )}
      <div className={[styles["burger-ingredients"], "pt-10"].join(" ")}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <div className={[styles["burger-ingredients__tubs"], "mt-5"].join(" ")}>
          <Tab
            value="Булки"
            active={currentTab === "Булки"}
            onClick={setCurrentTab}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={currentTab === "Соусы"}
            onClick={setCurrentTab}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={currentTab === "Начинки"}
            onClick={setCurrentTab}
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
            handlerOpenModal={setOpenModal}
          />
          <TypeSection
            listIngredients={ingredients}
            title="Соусы"
            type="sauce"
            handlerOpenModal={setOpenModal}
          />
          <TypeSection
            listIngredients={ingredients}
            title="Начинки"
            type="main"
            handlerOpenModal={setOpenModal}
          />
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
