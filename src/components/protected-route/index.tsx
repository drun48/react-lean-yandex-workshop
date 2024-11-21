import { useSelector } from "react-redux";
import { getIsAuthChecked, getUser } from "../../services/user/slice";
import Loader from "../loader";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  unAuth?: boolean;
  element: React.JSX.Element;
};

function ProtectedRoute({ unAuth = false, element }: Props) {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader />;
  }

  if (unAuth && user) {
    const { from } = location.state ?? { from: { pathname: "/ " } };
    return <Navigate to={from} />;
  }

  if (!unAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}

export const ProtectedRouteAuth = ProtectedRoute;
export const ProtectedRouteUnAuth = ({
  element,
}: {
  element: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute unAuth={true} element={element} />;