import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { INavItem, INavReport } from "interfaces/INavigation";
import useReportStore from "store/reportStore";
import { isMobileMode } from "utils/helpers";
import useUserStore from "store/userStore";

type NavItemProps = {
  item: INavItem | INavReport;
  children?: ReactNode;
  openedMenus: string[];
  setOpenedMenus: (name: string[]) => void;
  navPath?: string[];
};

export const NavItem: React.FC<NavItemProps> = ({
  item,
  children,
  openedMenus,
  setOpenedMenus,
  navPath,
}) => {
  const [isHovered, toggleIsHovered] = useState<boolean>(false);
  const { reportParams, selectedReport, setSelectedReport, getReportUrl } =
    useReportStore();
  const { toggleIsNavMenuOpened } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    clickManually();
  }, [reportParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const clickManually = () => {
    for (let i = 0; i < reportParams.length; i++) {
      if (reportParams[i] === item.name) {
        if (i === reportParams.length - 1) {
          handleSelectItem();
          break;
        } else {
          let openedMenusNew = [...reportParams];
          openedMenusNew.pop();
          setOpenedMenus(openedMenusNew);
          break;
        }
      }
    }
  };

  const handleDropdownClick = () => {
    if (typeof navPath !== "undefined") {
      const indexOfDropdown = openedMenus.findIndex(
        (menu) => menu === item.name
      );
      if (indexOfDropdown >= 0) {
        const newOpenedMenus = [...openedMenus];
        newOpenedMenus.length = indexOfDropdown;
        setOpenedMenus(newOpenedMenus);
      } else {
        setOpenedMenus(navPath);
      }
    }
  };

  const handleSelectItem = () => {
    setSelectedReport(item as INavReport);
    getReportUrl(item.id);
    if (isMobileMode()) {
      toggleIsNavMenuOpened(false);
    }
  };

  const redirectToReportURL = () => {
    if (typeof navPath !== "undefined") {
      navigate({
        pathname: "/report/q",
        search: createSearchParams({
          name: navPath.join("/"),
        }).toString(),
      });
    }
  };

  const computeIsMenuOpened = () => {
    return openedMenus?.includes(item.name);
  };

  const isMenuOpened = useMemo(() => {
    return computeIsMenuOpened();
  }, [openedMenus]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasChildrenOrReports =
    ("children" in item && item.children.length > 0) ||
    ("reports" in item && item.reports.length > 0);

  const isSelected = selectedReport?.name === item.name;

  const isTopLevel = "top" in item && item.top;

  return (
    <li>
      <div
        className={`flex items-center relative ${
          !isTopLevel ? "border-l border-green-250" : ""
        }`}
      >
        {!isTopLevel && <div className="circle" />}
        <button
          onClick={() => {
            hasChildrenOrReports
              ? handleDropdownClick()
              : redirectToReportURL();
          }}
          onMouseOver={() => toggleIsHovered(true)}
          onMouseOut={() => toggleIsHovered(false)}
          className={`menu__button flex items-center justify-between font-semibold
           ${isSelected && "bg-green-500 text-white h-[48px]"}
           ${!isSelected && isHovered && "text-green-500 font-bold"}
           ${!isSelected && "h-[40px]"}
          ${isTopLevel && isMenuOpened && "bg-green-200"}
          ${!isTopLevel && isMenuOpened && "bg-green-150"}`}
        >
          <label className="leading-4">{item.label}</label>
          {hasChildrenOrReports && (
            <img
              alt="dropdown"
              className={`${isMenuOpened ? "rotate-180" : ""}
              ${isHovered ? "filtered-primary-color" : ""}`}
              src={require("assets/images/dropdown-green-icon.svg").default}
            />
          )}
        </button>
      </div>
      {isMenuOpened && <ul>{children}</ul>}
    </li>
  );
};
