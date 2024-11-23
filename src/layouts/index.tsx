import AppHeader from "../components/app-header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container-main">
      <AppHeader />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
