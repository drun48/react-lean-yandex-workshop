import { FormEventHandler } from "react";
import { useFormState } from "../../hooks/form-state";
import { useAppDispatch } from "../../services";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-reset-password.module.css";
import { resetPassword } from "../../services/user/actions";

export default function FormResetPassword() {
  const [form, changeDataForm] = useFormState({ token: "", password: "" });
  const dispatch = useAppDispatch();

  const reset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  return (
    <form onSubmit={reset} className={styles.form}>
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={changeDataForm("password")}
        value={form.password}
        icon="ShowIcon"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={changeDataForm("name")}
        value={form.token}
      />
      <Button htmlType={"submit"} type="primary" size="medium">
        Сохранить
      </Button>
    </form>
  );
}
