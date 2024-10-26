import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={[styles["app-header"], "p-4"].join(" ")}>
      <div className={[styles["app-header__item"], "container"].join(" ")}>
        <nav className={styles.nav}>
          <div
            className={[
              styles["nav__item"],
              "pr-5",
              "pl-5",
              "pt-4",
              "pb-4",
            ].join(" ")}
          >
            <BurgerIcon type="primary" />
            <p className="text_type_main-default">Конструктор</p>
          </div>
          <div
            className={[
              styles["nav__item"],
              "pr-5",
              "pl-5",
              "pt-4",
              "pb-4",
              "disabled",
            ].join(" ")}
          >
            <ListIcon type="primary" />
            <p className="text_type_main-default">Лента заказов</p>
          </div>
        </nav>
        <Logo />
        <div
          className={[
            styles["nav__item"],
            "pr-5",
            "pl-5",
            "pt-4",
            "pb-4",
            "disabled",
          ].join(" ")}
        >
          <ProfileIcon type="primary" />
          <p className="text_type_main-default">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
