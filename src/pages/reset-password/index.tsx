import { Link } from "react-router-dom";
import FormResetPassword from "../../components/form-reset-password";
import styles from './reset-password.module.css'

function ResetPasswordPage() {
  return (
    <section className={styles['reset-password']}>
      <div className={styles['reset-password__form']}>
        <h2 className="text_type_main-medium">Восстановление пароля</h2>
        <FormResetPassword />
      </div>
      <footer>
        <p className="text_type_main-default disabled">Вспомнили пароль?</p>
        <Link to={"/login"} className="link-click text_type_main-default">
          Войти
        </Link>
      </footer>
    </section>
  );
}

export default ResetPasswordPage;
