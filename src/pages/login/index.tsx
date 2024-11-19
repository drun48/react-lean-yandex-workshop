import { Link } from "react-router-dom";
import FormLogin from "../../components/form-login";
import styles from "./login.module.css";

function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles['login__form']}>
        <h2 className="text_type_main-medium">Войти</h2>
        <FormLogin />
      </div>
      <div className={styles["container-transition"]}>
        <div className={styles["container-transition__item"]}>
          <p className="text_type_main-default disabled">
            Вы — новый пользователь?
          </p>
          <Link to={"/register"} className="link-click text_type_main-default">
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles["container-transition__item"]}>
          <p className="text_type_main-default disabled">Забыли пароль?</p>
          <Link
            to={"/forgot-password"}
            className="link-click text_type_main-default"
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
