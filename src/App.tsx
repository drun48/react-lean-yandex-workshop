import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BurgerConstructorPage,
  ForgotPasswordPage,
  IngredientsDetailPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  LayoutProfile,
} from "./pages";
import Layout from "./layouts";
import {
  ProtectedRouteAuth,
  ProtectedRouteUnAuth,
} from "./components/protected-route";
import { useEffect } from "react";
import { checAuth } from "./services/user/actions";
import { useAppDispatch } from "./services";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route
            path="/login"
            element={<ProtectedRouteUnAuth element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRouteUnAuth element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<ProtectedRouteUnAuth element={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRouteUnAuth element={<ResetPasswordPage />} />}
          />
          <Route element={<LayoutProfile />}>
            <Route
              path="/profile"
              element={<ProtectedRouteAuth element={<ProfilePage />} />}
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
