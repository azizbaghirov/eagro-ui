import { IUser } from "interfaces/IUser";
import { useState } from "react";
import useUserStore from "store/userStore";
import { getUserFromStorage } from "utils/helpers";
import useDefaultReport from "hooks/useDefaultReport";
import { ProfileMenu } from "./ProfileMenu";

export const Header = () => {
  const { isNavMenuOpened, toggleIsNavMenuOpened } = useUserStore();
  const [isProfileMenuOpen, toggleProfileMenuOpen] = useState<boolean>(false);
  const [goToDefaultReport] = useDefaultReport();

  const handleDorpdownClick = () => {
    toggleProfileMenuOpen(!isProfileMenuOpen);
  };

  const user: IUser = getUserFromStorage();

  return (
    <header className="flex shadow justify-between align items-center bg-white h-[84px] px-7 py-3 relative">
      {isProfileMenuOpen && (
        <ProfileMenu user={user} isProfileMenuOpen={isProfileMenuOpen} />
      )}
      {!isNavMenuOpened ? (
        <button onClick={() => toggleIsNavMenuOpened(true)}>
          <img
            alt="burger-menu-icon"
            src={require("assets/images/burger-menu-icon.svg").default}
          />
        </button>
      ) : (
        <button onClick={() => toggleIsNavMenuOpened(false)}>
          <img
            className="hidden lg:block"
            alt="constrict-icon"
            src={require("assets/images/constrict-icon.svg").default}
          />
          <img
            className="block lg:hidden"
            alt="constrict-icon"
            src={require("assets/images/close-icon.svg").default}
          />
        </button>
      )}
      <div className="block lg:hidden">
        <button className="flex" onClick={goToDefaultReport}>
          <img
            className="pr-4"
            src={require("assets/images/dns-green-logo.svg").default}
            alt="dns-logo"
          />
          <span className="text-green-500 text-4xl self-center">DNS</span>
        </button>
      </div>
      <div className="flex items-center">
        <div className="w-[33px] h-[33px] rounded-full p-1 bg-grey-200 lg:hidden">
          <img
            className="m-auto filtered-white-color"
            src={require("assets/images/silhouette-icon.svg").default}
            alt="avatar"
          />
        </div>
        <span className="mr-3.5 hidden lg:block">{`${user?.surname || ""} ${
          user?.name || ""
        } ${user?.fatherName || ""}`}</span>
        <button onClick={() => handleDorpdownClick()}>
          <img
            alt="dropdown"
            className={`filtered-black-color ${
              isProfileMenuOpen && `rotate-[180deg]`
            }`}
            src={require("assets/images/dropdown.svg").default}
          />
        </button>
      </div>
    </header>
  );
};
