import FormForgotPassword from "../../components/form-forgot-password";
import {
  getIsActiveforgotPassword,
  getLoading,
  setIsActiveforgotPassword,
} from "../../services/user/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { isActiveforgotPassword as isActiveforgotPasswordName } from "../../constants";
import styles from "./forgot-password.module.css";
import HelperNavigation from "../../components/helper-navigation";
import Loader from "../../components/loader";

function ForgotPasswordPage() {
  const isActiveforgotPassword = useAppSelector(getIsActiveforgotPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(getLoading);

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
    <>
      {loading && <Loader />}
      <section className={styles["forgot-password"]}>
        <div className={styles.form}>
          <h2 className="text_type_main-medium">Восстановление пароля</h2>
          <FormForgotPassword />
        </div>
        <HelperNavigation
          title="Уже зарегистрированы?"
          nameLink="Войти"
          link="/login"
        />
      </section>
    </>
  );
}

export default ForgotPasswordPage;
