import { IAlert } from "interfaces/IStore";
import { IUser } from "interfaces/IUser";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userService } from "services/user.service";
import useAlertStore from "store/alertStore";
import useUserStore from "store/userStore";
import { USER } from "utils/constants";
import { setToken } from "utils/helpers";

export const Login = () => {
  const { setAlert } = useAlertStore();
  const { setUser } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    window.location.href = `${process.env.REACT_APP_SSO_HOST}/auth?origin=${process.env.REACT_APP_SSO_CALLBACK_URL}`;
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_TEST);
    checkToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkToken = () => {
    userService
      .getUser()
      .then(() => {
        location.state ? navigate(-1) : navigate("/");
      })
      .catch((err) => {
        displayError(err.response);
      });
  };

  const displayError = (err: any) => {
    const { status, data } = err;
    switch (status) {
      case 401: {
        authUser();
        break;
      }
      case 403: {
        const alert: IAlert = {
          errMessage: data.message,
          isAuthError: true,
        };
        setAlert(alert);
        break;
      }
      default: {
        const alert: IAlert = {
          errMessage: "System Error",
          alertAction: () => {
            if (process.env.REACT_APP_SSO_LOGOUT_URL) {
              window.location.href = process.env.REACT_APP_SSO_LOGOUT_URL;
            } else {
              throw new Error(
                "REACT_APP_SSO_LOGOUT_URL environment variable is not set"
              );
            }
            localStorage.clear();
          },
        };
        setAlert(alert);
      }
    }
  };

  const authUser = () => {
    userService
      .getToken()
      .then((response) => setToken(response.data.data.token))
      .then(() => userService.getUser())
      .then((response) => allowUser(response.data));
  };

  const allowUser = (user: IUser) => {
    setUser(user);
    localStorage.setItem(USER, JSON.stringify(user));
    location.state ? navigate(-1) : navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-grey-50 w-screen h-screen">
      <div className="shadow-lg bg-white px-5 py-14 flex flex-col items-center content-center w-[306px] lg:w-[700px] h-[490px] lg:h-[534px]">
        <div className="flex mb-[16px] lg:mb-14">
          <img
            className="w-auto mr-[16px] lg:mr-[25px]"
            src={require("assets/images/eagro-logo.svg").default}
            alt="egro-logo"
          />
        </div>
        <div className="mb-20 text-center">
          <span className="text-grey-300 text-lg lg:text-2xl">
            Elektron Kənd Təsərrüfatı İnformasiya Sistemi
          </span>
        </div>
        {/* <div className="mb-11 text-center">
          <span className="text-lg lg:text-2xl">
            “Daxili Nəzarət Sistemi” alt sistemi
          </span>
        </div> */}
        <button
          onClick={handleButtonClick}
          className="bg-blue shadow-md hover:shadow-2xl hover:font-medium flex rounded-md h-[46px] lg:h-[80px] lg:w-[260px] overflow-hidden relative py-[10px] lg:py-[22px] pr-[28px] lg:pr-[35px] mb-16 lg:mb-24"
        >
          <div className="bg-white rounded-full w-[70px] h-[70px] lg:w-[120px] lg:h-[120px] relative top-[-24px] left-[-14px] lg:top-[-40px] lg:left-[-20px]">
            <img
              className="absolute w-[33px] lg:w-[auto] top-[30%] left-[32%]"
              src={require("assets/images/sso.svg").default}
              alt="sso"
            />
          </div>
          <label className="text-white text-lg lg:text-3xl">Daxil ol</label>
        </button>
        <div>
          <span className="text-inactive font-normal text-xs lg:text-base">
            “DNS” © 2021 - 2023. Ağrın aleem.
          </span>
        </div>
      </div>
    </div>
  );
};
