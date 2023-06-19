import { useEffect } from "react";
import { userService } from "services/user.service";
import { USER } from "utils/constants";
import useUserStore from "store/userStore";
import { setToken } from "utils/helpers";
import { IUser } from "interfaces/IUser";

const Auth = () => {
  const { setUser } = useUserStore();

  const allowUser = (user: IUser) => {
    setUser(user);
    localStorage.setItem(USER, JSON.stringify(user));
    window.location.pathname = "/";
  };

  const authUser = () => {
    userService
      .getToken()
      .then((response) => setToken(response.data.data.token))
      .then(() => userService.getUser())
      .then((response) => allowUser(response.data))
      .catch((err) => {
        console.log(err);
        window.location.pathname = "/login";
      });
  };

  useEffect(() => {
    authUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>Gözləyiin...</div>;
};

export default Auth;
