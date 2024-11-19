import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEventHandler } from "react";
import { useFormState } from "../../hooks/form-state";
import styles from "./form-login.module.css";

function FormLogin() {
  const [form, setForm] = useFormState({ email: "", password: "" });

  const register: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={register} className={styles.form}>
      <EmailInput
        onChange={setForm("email")}
        value={form.email}
        name={"email"}
        isIcon={false}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={setForm("password")}
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
