import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./form-register.module.css";
import { useFormState } from "../../hooks/form-state";
import { FormEventHandler } from "react";

function FormRegister() {
  const [form, setForm] = useFormState({ name: "", email: "", password: "" });

  const register: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={register} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={setForm("name")}
        value={form.name}
      />
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
        Зарегистрироваться
      </Button>
    </form>
  );
}

export default FormRegister;
