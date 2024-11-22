import { Outlet } from "react-router-dom";
import Logout from "../../components/logout";
import NavProfile from "../../components/nav-profile";
import styles from "./profile.module.css";

function LayoutProfile() {
  return (
    <section className={styles["profile-page"]}>
      <div className={styles["container-nav"]}>
        <div className={styles.nav}>
          <NavProfile />
          <Logout />
        </div>
        <footer id="profile-page-footer" />
      </div>
      <Outlet />
    </section>
  );
}

export default LayoutProfile;
