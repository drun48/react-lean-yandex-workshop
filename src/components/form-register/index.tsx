import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-register.module.css";
import { useFormState } from "../../hooks/form-state";
import { FormEventHandler } from "react";
import { register as registerAction } from "../../services/user/actions";
import { useAppDispatch } from "../../services";

function FormRegister() {
  const [form, changeDataForm] = useFormState({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();

  const register: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(registerAction(form));
  };

  return (
    <form onSubmit={register} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={changeDataForm("name")}
        value={form.name}
      />
      <EmailInput
        onChange={changeDataForm("email")}
        value={form.email}
        name={"email"}
        isIcon={false}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={changeDataForm("password")}
        value={form.password}
        icon="ShowIcon"
      />
      <Button htmlType={"submit"} type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </form>
  );
}

export default FormRegister;
