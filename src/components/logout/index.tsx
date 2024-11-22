import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { logout } from "../../services/user/actions";
import { useAppDispatch } from "../../services";
import styles from "./logout.module.css";

export default function Logout() {
  const dispatch = useAppDispatch();
  const handlerClick = () => {
    dispatch(logout());
  };
  return (
    <Button
      htmlType="button"
      type="secondary"
      onClick={handlerClick}
      extraClass={[styles.logout, "text_type_main-medium", "disabled"].join(
        " "
      )}
    >
      Выход
    </Button>
  );
}
