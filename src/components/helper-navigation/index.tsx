import { Link } from "react-router-dom";
import styles from "./helper-navigation.module.css";

type Props = {
  title: string;
  nameLink: string;
  link: string;
};

export default function HelperNavigation({ title, nameLink, link }: Props) {
  return (
    <div className={styles["helper-navigation"]}>
      <p className="text_type_main-default disabled">{title}</p>
      <Link to={link} className="link-click text_type_main-default">
        {nameLink}
      </Link>
    </div>
  );
}
