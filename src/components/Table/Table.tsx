import { FC, useRef, useState } from "react";
import Switch from "react-switch";
import moment from "moment";
import "moment/locale/az";
import useOutsideClicker from "hooks/useOutsideClicker";
import Pagination from "components/Table/Pagination";

type TableHeadProps = {
  headers: string[];
};

const TableHead: FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead className="bg-grey-25 text-sm h-14 text-left border-solid border-b">
      <tr>
        {headers.map((header: string, index: number) => (
          <th key={index} className="pl-4">
            {header}
          </th>
        ))}
        <th className="w-28"></th>
      </tr>
    </thead>
  );
};

type TableRowProps = {
  data: any;
  editRow: () => void;
  deleteRow: () => void;
  handleSwitch: (checked: boolean, id: number) => void;
};

const TableRow: FC<TableRowProps> = ({
  data,
  deleteRow,
  editRow,
  handleSwitch,
}) => {
  const [isActionsVisible, toggleActionsVisible] = useState<boolean>(false);

  return (
    <tr className="h-14 border-solid border-b hover:bg-grey-50">
      <td className="pl-4">{data.name}</td>
      <td className="pl-4">{data.group.name}</td>
      <td className="pl-4">
        {moment(new Date(data.fileDate)).locale("az").format("D MMMM YYYY")}
      </td>
      <td className="pl-4 w-32">
        <div className="w-full flex justify-between items-center">
          {data.status ? (
            <span className="text-lightGreen">Aktiv</span>
          ) : (
            <span className="text-red">Deaktiv</span>
          )}
          <Switch
            onColor="#0F766E"
            offColor="#bdbdbd"
            checked={data.status}
            onChange={(checked) => {
              handleSwitch(checked, data.id);
            }}
            checkedIcon={false}
            uncheckedIcon={false}
            height={18}
            width={40}
          />
        </div>
      </td>
      <td className="pl-4 relative">
        <div className="text-center">
          <button
            className="w-8 h-7 rounded-sm focus:border border-solid border-green-350"
            onClick={() => toggleActionsVisible(!isActionsVisible)}
          >
            <img
              className="m-auto"
              alt="three-dots-icon"
              src={require("assets/images/three-dots-icon.svg").default}
            />
          </button>
        </div>
        {isActionsVisible && (
          <RowActions
            closeTooltip={() => toggleActionsVisible(false)}
            deleteRow={deleteRow}
            editRow={editRow}
          />
        )}
      </td>
    </tr>
  );
};

type RowActionsProps = {
  closeTooltip: () => void;
  editRow: () => void;
  deleteRow: () => void;
};

const RowActions: FC<RowActionsProps> = ({
  deleteRow,
  editRow,
  closeTooltip,
}) => {

  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, closeTooltip);

  return (
    <div
      ref={wrapperRef}
      className="w-32 rounded-sm bg-white shadow-md absolute z-50 top-[46px] right-[28px]"
    >
      <ul>
        <li className="py-1 px-3 cursor-pointer hover:bg-gray-50">
          <button
            className="flex items-center w-full"
            onClick={() => {
              editRow();
              closeTooltip();
            }}
          >
            <img
              className="mr-2"
              alt="three-dots-icon"
              src={require("assets/images/edit-icon.svg").default}
            />
            <span>Redaktə et</span>
          </button>
        </li>
        <li className="py-1 px-3 cursor-pointer hover:bg-gray-50">
          <button
            className="flex items-center w-full"
            onClick={() => {
              closeTooltip();
              deleteRow();
            }}
          >
            <img
              className="mr-2"
              alt="three-dots-icon"
              src={require("assets/images/trash-bin-icon.svg").default}
            />
            <span>Sil</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

type TableProps = {
  data: any[];
  headers: string[];
  editRow: (data: any) => void;
  deleteRow: (id: number) => void;
  handleSwitch: (checked: boolean, id: number) => void;
  handlePageChange: (pageNo: number) => void;
  pageCount: number;
  currentPageNo: number;
};

export const Table: FC<TableProps> = ({
  data,
  headers,
  editRow,
  deleteRow,
  handlePageChange,
  pageCount,
  currentPageNo,
  handleSwitch,
}) => {
  return (
    <>
      <div className="mt-8">
        <table id="table" className="w-full drop-shadow-md">
          <TableHead headers={headers} />
          <tbody id="t-body" className="bg-white">
            {data?.map((d, index) => (
              <TableRow
                data={d}
                editRow={() => editRow(d)}
                deleteRow={() => deleteRow(d.id)}
                handleSwitch={(checked: boolean, id: number) =>
                  handleSwitch(checked, id)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        handlePageChange={(pageNo: number) => handlePageChange(pageNo)}
        pageCount={pageCount}
        currentPageNo={currentPageNo}
      />
    </>
  );
};
