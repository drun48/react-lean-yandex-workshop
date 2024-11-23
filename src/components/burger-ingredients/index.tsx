import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TypeSection from "./type-section";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../loader";
import styles from "./burger-ingredients.module.css";
import { getStateIngredients } from "../../services/ingredients/slice";
import { getList } from "../../services/ingredients/actions";
import { useAppDispatch, useAppSelector } from "../../services";

function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { list: ingredients, loading: isLoading } =
    useAppSelector(getStateIngredients);

  const [currentTab, setCurrentTab] = useState<string>("");

  const refContainerIngredients = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  const onScroll = useCallback(() => {
    const container = refContainerIngredients.current;
    if (!container) return;
    let element = container.children[0] as HTMLDivElement;
    const offsetTop = container.offsetTop + container.scrollTop;
    let minDist = Math.abs(element.offsetTop - offsetTop);
    Array.from(container.children).forEach((el) => {
      const div = el as HTMLDivElement;
      if (Math.abs(div.offsetTop - offsetTop) <= minDist) {
        minDist = Math.abs(div.offsetTop - offsetTop);
        element = div;
      }
    });
    if (element.dataset?.type) {
      setCurrentTab(element.dataset?.type);
    }
  }, [refContainerIngredients]);

  const clickTab = useCallback(
    (tabValue: string) => {
      const container = refContainerIngredients.current;
      if (!container) return;
      const findTabSection = Array.from(container.children).find((el) => {
        const div = el as HTMLDivElement;
        return div.dataset?.type === tabValue;
      }) as HTMLDivElement | undefined;
      if (!findTabSection) return;
      setCurrentTab(tabValue);
      container.scrollTo({
        top: findTabSection.offsetTop - container.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    },
    [setCurrentTab, refContainerIngredients]
  );

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={[styles["burger-ingredients"], "pt-10"].join(" ")}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <div className={[styles["burger-ingredients__tubs"], "mt-5"].join(" ")}>
          <Tab value="bun" active={currentTab === "bun"} onClick={clickTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === "sauce"} onClick={clickTab}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === "main"} onClick={clickTab}>
            Начинки
          </Tab>
        </div>
        <div
          onScroll={onScroll}
          ref={refContainerIngredients}
          className={[
            styles["burger-ingredients__items"],
            "mt-10",
            "scroll",
          ].join(" ")}
        >
          <TypeSection listIngredients={ingredients} title="Булки" type="bun" />
          <TypeSection
            listIngredients={ingredients}
            title="Соусы"
            type="sauce"
          />
          <TypeSection
            listIngredients={ingredients}
            title="Начинки"
            type="main"
          />
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
