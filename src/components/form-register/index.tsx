import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEventHandler, useState } from "react";
import styles from './form-register.module.css'

function FormRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const changeDataForm = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm({ ...form, [field]: value });
    };
  };

  const register:FormEventHandler<HTMLFormElement> = (e)=>{
    e.preventDefault()
    console.log(form)
  }

  return (
    <form onSubmit={register} className={styles.form}>
      <h2 className="text_type_main-medium">Регистрация</h2>
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
