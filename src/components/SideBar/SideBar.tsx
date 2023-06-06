import { useEffect } from "react";
import { SideBarHeader } from "components/SideBar/SideBarHeader";
import { NavMenu } from "components/SideBar/Navigation/NavMenu";
import useUserStore from "store/userStore";
import { isMobileMode } from "utils/helpers";
import { useLocation } from "react-router-dom";

export const SideBar = () => {
  const { isNavMenuOpened, toggleIsNavMenuOpened } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    const isMobileModeDevice = isMobileMode();
    toggleIsNavMenuOpened(!isMobileModeDevice);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isHierarchicalMenu = location.pathname !== "/admin";

  return (
    <div
      className={`w-screen lg:w-[280px] xl:w-[346px] bg-white h-screen border-solid border-r fixed z-10
         ${!isNavMenuOpened ? "left-[-1000px]" : "left-0 top-[84px] lg:top-0"}`}
    >
      <SideBarHeader />
      <NavMenu isHierarchicalMenu={isHierarchicalMenu} />
    </div>
  );
};
