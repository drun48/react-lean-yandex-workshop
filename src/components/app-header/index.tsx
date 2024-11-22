import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={[styles["app-header"], "p-4"].join(" ")}>
      <div className={[styles["app-header__item"], "container"].join(" ")}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              [styles["nav__item"], isActive ? "active-link" : "disabled"].join(
                " "
              )
            }
          >
            <BurgerIcon type="primary" />
            <p className="text_type_main-default">Конструктор</p>
          </NavLink>
          <NavLink
            to="/order-feed"
            className={({ isActive }) =>
              [styles["nav__item"], isActive ? "active-link" : "disabled"].join(
                " "
              )
            }
          >
            <ListIcon type="primary" />
            <p className="text_type_main-default">Лента заказов</p>
          </NavLink>
        </nav>
        <Logo className={styles.logo} />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            [
              styles["nav__item"],
              "pr-5",
              "pl-5",
              "pt-4",
              "pb-4",
              isActive ? "active-link" : "disabled",
            ].join(" ")
          }
        >
          <ProfileIcon type="primary" />
          <p className="text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
