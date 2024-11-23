import FormResetPassword from "../../components/form-reset-password";
import styles from "./reset-password.module.css";
import HelperNavigation from "../../components/helper-navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isActiveforgotPassword as isActiveforgotPasswordName } from "../../constants";
import { useSelector } from "react-redux";
import {
  getIsActiveforgotPassword,
  getLoading,
  setIsActiveforgotPassword,
} from "../../services/user/slice";
import Loader from "../../components/loader";
import { useAppDispatch } from "../../services";

export default function ResetPasswordPage() {
  const isActiveforgotPassword = useSelector(getIsActiveforgotPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(
      setIsActiveforgotPassword(
        !!localStorage.getItem(isActiveforgotPasswordName)
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isActiveforgotPassword) {
      navigate("/login");
    }
  }, [isActiveforgotPassword, navigate]);

  return (
    <>
      {loading && <Loader />}
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
    </>
  );
}
