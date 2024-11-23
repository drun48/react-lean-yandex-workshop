import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormState } from "../../hooks/form-state";
import { useAppDispatch } from "../../services";
import styles from "./form-profile.module.css";
import { useSelector } from "react-redux";
import { FormEventHandler, useEffect, useMemo } from "react";
import { getUser } from "../../services/user/slice";
import { edit } from "../../services/user/actions";

const initForm = {
  email: "",
  password: "",
  name: "",
};

export default function FormProfile() {
  const [form, changeDataForm, setForm] = useFormState(initForm);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      setForm({ ...user, password: "" });
    }
  }, [setForm, user]);

  const dispatch = useAppDispatch();

  const changes = useMemo(() => {
    return Object.entries(form).reduce((res, [key, value]) => {
      {
        if (value && value !== (user as Record<string, string>)[key]) {
          res[key] = value;
        }
        return res;
      }
    }, {} as Record<string, string>);
  }, [form, user]);

  const isChages = useMemo(() => {
    return Object.values(changes).find((el) => !!el);
  }, [changes]);

  const editUser: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(edit(changes));
  };

  const cancel = () => {
    if (user) {
      setForm({ ...user, password: "" });
    } else {
      setForm({ ...initForm });
    }
  };

  return (
    <form onSubmit={editUser} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={changeDataForm("name")}
        value={form.name}
        icon="EditIcon"
      />
      <EmailInput
        onChange={changeDataForm("email")}
        value={form.email}
        name={"email"}
        isIcon={true}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={changeDataForm("password")}
        value={form.password}
        icon="EditIcon"
      />
      {isChages && (
        <footer>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={cancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </footer>
      )}
    </form>
  );
}
