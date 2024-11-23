import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEventHandler } from "react";
import { useFormState } from "../../hooks/form-state";
import styles from "./form-forgot-password.module.css";
import { useAppDispatch } from "../../services";
import { forgotPassword } from "../../services/user/actions";

export default function FormForgotPassword() {
  const dispatch = useAppDispatch();
  const [form, changeDataForm] = useFormState({ email: "" });

  const send: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(form.email));
  };

  return (
    <form onSubmit={send} className={styles.form}>
      <EmailInput
        onChange={changeDataForm("email")}
        value={form.email}
        name={"email"}
        isIcon={false}
      />
      <Button htmlType={"submit"} type="primary" size="medium">
        Восстановить
      </Button>
    </form>
  );
}
