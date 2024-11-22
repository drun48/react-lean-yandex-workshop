import FormRegister from "../../components/form-register";
import styles from "./register.module.css";
import HelperNavigation from "../../components/helper-navigation";

function RegisterPage() {
  return (
    <div className={styles["container-register"]}>
      <div className={styles["register-form"]}>
        <h2 className="text_type_main-medium">Регистрация</h2>
        <FormRegister />
      </div>
      <HelperNavigation
        title="Уже зарегистрированы?"
        nameLink="Войти"
        link="/login"
      />
    </div>
  );
}

export default RegisterPage;
