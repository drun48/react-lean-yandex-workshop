import { useSelector } from "react-redux";
import FormForgotPassword from "../../components/form-forgot-password";
import {
  getIsActiveforgotPassword,
  setIsActiveforgotPassword,
} from "../../services/user/slice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services";
import { isActiveforgotPassword as isActiveforgotPasswordName } from "../../constants";
import styles from "./forgot-password.module.css";

function ForgotPasswordPage() {
  const isActiveforgotPassword = useSelector(getIsActiveforgotPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setIsActiveforgotPassword(
        !!localStorage.getItem(isActiveforgotPasswordName)
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (isActiveforgotPassword) {
      navigate("/reset-password");
    }
  }, [isActiveforgotPassword, navigate]);

  return (
    <section className={styles["forgot-password"]}>
      <div className={styles.form}>
        <h2 className="text_type_main-medium">Восстановление пароля</h2>
        <FormForgotPassword />
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

export default ForgotPasswordPage;
