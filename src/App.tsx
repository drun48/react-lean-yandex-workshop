import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  BurgerConstructorPage,
  ForgotPasswordPage,
  IngredientsDetailPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  LayoutProfile,
  HistoryOrderPage,
  Feed,
  OrderDetail,
} from "./pages";
import Layout from "./layouts";
import {
  ProtectedRouteAuth,
  ProtectedRouteUnAuth,
} from "./components/protected-route";
import { useEffect } from "react";
import { checAuth } from "./services/user/actions";
import { useAppDispatch } from "./services";
import BaseModal from "./components/base-modal";
import IngredientDetails from "./components/burger-ingredients/ingredient-details";
import OrderDetailIngredient from "./components/order-detail-ingredient";
import { getList } from "./services/ingredients/actions";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    dispatch(checAuth());
    dispatch(getList());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<Layout />}>
          <Route path="/" element={<BurgerConstructorPage />} />
          <Route
            path="/login"
            element={<ProtectedRouteUnAuth element={<LoginPage />} />}
          />
          <Route path="/feed" element={<Feed />} />
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
            <Route
              path="/profile/orders"
              element={<ProtectedRouteAuth element={<HistoryOrderPage />} />}
            />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsDetailPage />} />

          <Route path="/feed/:number" element={<OrderDetail />} />
          <Route
            path="/profile/orders/:number"
            element={<ProtectedRouteAuth element={<OrderDetail />} />}
          />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <BaseModal
                handlerClose={handleModalClose}
                title="Детали ингредиента"
              >
                <IngredientDetails />
              </BaseModal>
            }
          />

          <Route
            path="/feed/:number"
            element={
              <BaseModal handlerClose={handleModalClose}>
                <OrderDetailIngredient />
              </BaseModal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRouteAuth
                element={
                  <BaseModal handlerClose={handleModalClose}>
                    <OrderDetailIngredient />
                  </BaseModal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
