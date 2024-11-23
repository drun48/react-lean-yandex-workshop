import FormLogin from "../../components/form-login";
import styles from "./login.module.css";
import HelperNavigation from "../../components/helper-navigation";

function LoginPage() {
  return (
    <div className={styles.login}>
      <div className={styles["login__form"]}>
        <h2 className="text_type_main-medium">Войти</h2>
        <FormLogin />
      </div>
      <div className={styles["container-transition"]}>
        <HelperNavigation
          title="Вы — новый пользователь?"
          nameLink="Зарегистрироваться"
          link="/register"
        />
        <HelperNavigation
          title="Забыли пароль?"
          nameLink="Восстановить пароль"
          link="/forgot-password"
        />
      </div>
    </div>
  );
}

export default LoginPage;
