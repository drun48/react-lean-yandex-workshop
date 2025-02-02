import { NavLink } from "react-router-dom";
import styles from "./nav-profile.module.css";

function NavProfile() {
  return (
    <div className={styles["nav-profile"]}>
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          ["text_type_main-medium", isActive ? "active-link" : "disabled"].join(
            " "
          )
        }
      >
        Профиль
      </NavLink>
      <NavLink
        to="profile/orders"
        className={({ isActive }) =>
          ["text_type_main-medium", isActive ? "active-link" : "disabled"].join(
            " "
          )
        }
      >
        История заказов
      </NavLink>
    </div>
  );
}

export default NavProfile;
