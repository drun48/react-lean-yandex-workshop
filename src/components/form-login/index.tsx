import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEventHandler } from "react";
import { useFormState } from "../../hooks/form-state";
import styles from "./form-login.module.css";
import { useAppDispatch } from "../../services";
import { login as loginAction } from "../../services/user/actions";

function FormLogin() {
  const [form, changeDataForm] = useFormState({ email: "", password: "" });
  const dispatch = useAppDispatch();

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(loginAction(form));
  };

  return (
    <form onSubmit={login} className={styles.form}>
      <EmailInput
        onChange={changeDataForm("email")}
        value={form.email}
        name={"email"}
        isIcon={false}
        data-testid='input-auth-email'
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={changeDataForm("password")}
        value={form.password}
        icon="ShowIcon"
      />
      <Button htmlType={"submit"} type="primary" size="medium">
        Войти
      </Button>
    </form>
  );
}

export default FormLogin;
