import { Outlet } from "react-router-dom";
import Logout from "../../components/logout";
import NavProfile from "../../components/nav-profile";
import styles from "./profile.module.css";

function LayoutProfile() {
  return (
    <section className={styles["profile-page"]}>
      <div className={styles.nav}>
        <NavProfile />
        <Logout />
      </div>
      <Outlet />
    </section>
  );
}

export default LayoutProfile;
