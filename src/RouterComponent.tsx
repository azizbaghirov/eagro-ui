import { lazy, ReactNode, FC, Suspense } from "react";
import {
  Route,
  Navigate,
  useLoaderData,
  defer,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Await,
} from "react-router-dom";
import "./index.css";
import { Login } from "containers/Login";
import { getTokenFromStorage } from "utils/helpers";
import { userService } from "services/user.service";
import { Loader } from "components/Loader";
import { PdfReport } from "components/Reports/PdfReport";
import { getUserFromStorage } from "utils/helpers";
import { IUser } from "interfaces/IUser";
import { Roles } from "utils/enums";

const Dashboard = lazy(() => import("./containers/Dashboard"));
const Auth = lazy(() => import("./containers/Auth"));
const AdminPanel = lazy(() => import("./containers/AdminPanel"));
const ReportOperations = lazy(
  () => import("./components/AdminOperations/ReportOperations/ReportOperations")
);
const MapLayout = lazy(() => import("./components/GIS/MapLayout"));

type RestrictedRouteProps = {
  children: ReactNode;
};

const RestrictedRoute: FC<RestrictedRouteProps> = ({ children }) => {
  const data: any = useLoaderData();
  const token = getTokenFromStorage();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={data.user}
        errorElement={
          <Navigate state={{ isRedirectRequired: true }} to={`/login`} />
        }
      >
        {token && data.user ? (
          children
        ) : (
          <Navigate state={{ isRedirectRequired: true }} to={`/login`} />
        )}
      </Await>
    </Suspense>
  );
};

const RouterComponent = () => {
  const user: IUser = getUserFromStorage();

  async function checkToken() {
    return defer({ user: userService.getUser() });
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          loader={checkToken}
          path="/pdfreport/:id"
          element={
            <RestrictedRoute>
              <PdfReport />
            </RestrictedRoute>
          }
        />
        <Route
          loader={checkToken}
          path="/gis/ktn/:type"
          element={
            <RestrictedRoute>
              <MapLayout />
            </RestrictedRoute>
          }
        />
        <Route
          loader={checkToken}
          path="/report/:name"
          element={
            <RestrictedRoute>
              <Dashboard />
            </RestrictedRoute>
          }
        />
        <Route
          loader={checkToken}
          path="/reportOperations"
          element={
            <RestrictedRoute>
              <ReportOperations />
            </RestrictedRoute>
          }
        />
        <Route
          loader={checkToken}
          path="/admin"
          element={
            <RestrictedRoute>
              <AdminPanel />
            </RestrictedRoute>
          }
        />
        <Route
          loader={checkToken}
          path="/"
          element={
            user?.authorities?.includes(Roles.user) ? (
              <RestrictedRoute>
                <Dashboard />
              </RestrictedRoute>
            ) : (
              <RestrictedRoute>
                <AdminPanel />
              </RestrictedRoute>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default RouterComponent;
