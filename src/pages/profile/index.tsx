import { createPortal } from "react-dom";
import FormProfile from "../../components/form-profile";
import { useEffect, useState } from "react";
import styles from "./profile.module.css";

function ProfilePage() {
  const [conainerFooter, setConainerFooter] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setConainerFooter(document.getElementById("profile-page-footer") ?? null);
  }, []);

  return (
    <>
      <FormProfile />
      {conainerFooter &&
        createPortal(
          <p
            className={[
              styles["text-description"],
              "text_type_main-default",
              "text_color_inactive",
            ].join(" ")}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>,
          conainerFooter
        )}
    </>
  );
}

export default ProfilePage;
