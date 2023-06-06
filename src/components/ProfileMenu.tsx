import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "interfaces/IUser";
import { Roles } from "utils/enums";

type ProfileProps = {
  isProfileMenuOpen: boolean;
  user: IUser;
};

const logout = () => {
  if (process.env.REACT_APP_SSO_LOGOUT_URL) {
    window.location.href = process.env.REACT_APP_SSO_LOGOUT_URL;
  } else {
    throw new Error("REACT_APP_SSO_LOGOUT_URL environment variable is not set");
  }
};

export const ProfileMenu: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white rounded-b-[8px] shadow w-[225px] absolute top-[84px] right-0 z-10 text-sm">
      <ul>
        <li className="lg:hidden p-5 border-b">
          <div className="flex">
            <img
              alt="exit-icon"
              className="pr-3"
              src={require("assets/images/silhouette-icon.svg").default}
            />
            <span className="text-grey-200">{`${user?.surname || ""} ${
              user?.name || ""
            }`}</span>
          </div>
        </li>
        {user.authorities.includes(Roles.admin) && (
          <>
            {location.pathname === "/admin" ? (
              <li className="p-5">
                <button
                  className="flex items-center w-full"
                  onClick={() => navigate("/report/q")}
                >
                  <img
                    alt="exit-icon"
                    className="pr-3"
                    src={require("assets/images/report-icon.svg").default}
                  />
                  <span>Hesabatlıq</span>
                </button>
              </li>
            ) : (
              <li className="p-5">
                <button
                  className="flex items-center w-full"
                  onClick={() => navigate("/admin")}
                >
                  <img
                    alt="exit-icon"
                    className="pr-3"
                    src={require("assets/images/admin-icon.svg").default}
                  />
                  <span>Admin panel</span>
                </button>
              </li>
            )}
          </>
        )}
        <li className="p-5">
          <button className="flex items-center w-full" onClick={() => logout()}>
            <img
              alt="exit-icon"
              className="pr-3"
              src={require("assets/images/exit-icon.svg").default}
            />
            <span>Çıxış</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
