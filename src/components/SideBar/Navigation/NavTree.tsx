import React, { useState } from "react";
import { INavItem, INavReport } from "interfaces/INavigation";
import { NavItem } from "./NavItem";

type NavTreeProps = {
  data: INavItem[];
};

let NavTree: React.FC<NavTreeProps> = ({ data }) => {
  const [openedMenus, setOpenedMenus] = useState<string[]>([]);

  const createTree = (item: INavItem, navPath: string[] = []) => {
    return (
      <NavItem
        item={item}
        key={item.name}
        setOpenedMenus={setOpenedMenus}
        openedMenus={openedMenus}
        navPath={[...navPath, item.name]}
      >
        {item.reports?.map((report: INavReport) => (
          <NavItem
            item={report}
            key={report.name}
            setOpenedMenus={setOpenedMenus}
            openedMenus={openedMenus}
            navPath={[...navPath, item.name, report.name]}
          />
        ))}
        {item.children?.map((child: INavItem) => (
          <>{createTree(child, [...navPath, item.name])}</>
        ))}
      </NavItem>
    );
  };

  return <>{data?.length > 0 && data.map((d) => <>{createTree(d)}</>)}</>;
};

function isDataEqual(prevData: any, nextData: any) {
  return JSON.stringify(prevData) === JSON.stringify(nextData);
}

export default React.memo(NavTree, isDataEqual);
