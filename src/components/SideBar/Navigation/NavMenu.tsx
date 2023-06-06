import NavTree from "./NavTree";
import useReportStore from "store/reportStore";
import useAdminStore from "store/adminStore";
import { useEffect } from "react";
import { SimpleTree } from "./SimpleTree";

type NavMenuProps = {
  isHierarchicalMenu: boolean;
};

export const NavMenu: React.FC<NavMenuProps> = ({ isHierarchicalMenu }) => {
  const { reports, getReportList } = useReportStore();
  const { getOperationList, operationList } = useAdminStore();

  useEffect(() => {
    isHierarchicalMenu ? getReportList() : getOperationList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="menu h-[calc(100vh_-_84px)] scrollbar-thumb-green-200 scrollbar-thumb-rounded-full scrollbar-thin xl:text-[16px]">
      <nav>
        <ul>
          {isHierarchicalMenu ? (
            <NavTree data={reports} />
          ) : (
            <SimpleTree data={operationList} />
          )}
        </ul>
      </nav>
    </div>
  );
};
