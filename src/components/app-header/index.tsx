import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const styleNavItem = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    cursor: "pointer",
  };
  return (
    <header
      style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: "100%",
        background: "rgba(28, 28, 33, 1)",
      }}
      className="p-4"
    >
      <div style={{display: "flex", maxWidth:'1280px', width:'100%', alignItems:'center', justifyContent:'space-between'}} >
        <nav style={{ display: "flex" }}>
          <div style={styleNavItem} className="pr-5 pl-5 pt-4 pb-4">
            <BurgerIcon type="primary" />
            <p className="text_type_main-default">Конструктор</p>
          </div>
          <div style={styleNavItem} className="pr-5 pl-5 pt-4 pb-4 disabled">
            <ListIcon type="primary" />
            <p className="text_type_main-default">Лента заказов</p>
          </div>
        </nav>
        <Logo />
        <div style={styleNavItem} className="pr-5 pl-5 pt-4 pb-4 disabled">
          <ProfileIcon type="primary" />
          <p className="text_type_main-default">Личный кабинет</p>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
