import { Link } from "react-router-dom";
import FormRegister from "../../components/form-register";
import styles from "./register.module.css";

function RegisterPage() {
  return (
    <div className={styles["container-register"]}>
      <div className={styles["register-form"]}>
        <h2 className="text_type_main-medium">Регистрация</h2>
        <FormRegister />
      </div>
      <div className={styles["container-transition"]}>
        <p className="text_type_main-default disabled">Уже зарегистрированы?</p>
        <Link to={"/login"} className="link-click text_type_main-default">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
