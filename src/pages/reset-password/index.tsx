import FormResetPassword from "../../components/form-reset-password";
import styles from "./reset-password.module.css";
import HelperNavigation from "../../components/helper-navigation";

function ResetPasswordPage() {
  return (
    <section className={styles["reset-password"]}>
      <div className={styles["reset-password__form"]}>
        <h2 className="text_type_main-medium">Восстановление пароля</h2>
        <FormResetPassword />
      </div>
      <HelperNavigation
        title="Уже зарегистрированы?"
        nameLink="Войти"
        link="/login"
      />
    </section>
  );
}

export default ResetPasswordPage;
