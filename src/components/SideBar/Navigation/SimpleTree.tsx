import { IOperation } from "interfaces/IAdmin";
import useAdminStore from "store/adminStore";

type SimpleTreeProps = {
  data: IOperation[];
};

export const SimpleTree: React.FC<SimpleTreeProps> = ({ data }) => {
  const { selectedOperation, setSelectedOperation } = useAdminStore();

  const isSelected = (el: IOperation): boolean => {
    return selectedOperation?.name === el.name;
  };

  return (
    <>
      {data?.length > 0 &&
        data.map((el) => (
          <li key={el.id}>
            <button
              onClick={() => setSelectedOperation(el)}
              className={`menu__button flex items-center justify-between font-semibold
           ${
             isSelected(el) &&
             "bg-green-500 hover:bg-green-350 text-white h-[48px]"
           }
           ${!isSelected(el) && "hover:text-green-500 hover:font-bold"}
           `}
            >
              <label>{el.name}</label>
            </button>
          </li>
        ))}
    </>
  );
};
