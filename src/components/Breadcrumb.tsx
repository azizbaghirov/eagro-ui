import useDefaultReport from "hooks/useDefaultReport";
import useReportStore from "store/reportStore";

export const Breadcrumb = () => {
  const { breadcrumb } = useReportStore();
  const [goToDefaultReport] = useDefaultReport();

  return (
    <div className="flex font-medium px-7 py-7">
      <div className="flex">
        <button onClick={goToDefaultReport}>
          <span className="text-black-300">Əsas səhifə</span>
        </button>
        <img
          alt="dropdown"
          className="filtered-black-color rotate-[270deg]"
          src={require("assets/images/dropdown.svg").default}
        />
      </div>
      {breadcrumb?.map((label: string, index: number) => (
        <PathElement
          label={label}
          key={index}
          isLastElement={breadcrumb.length - 1 === index}
        />
      ))}
    </div>
  );
};

export const MobileBreadcrumb = () => {
  const [goToDefaultReport] = useDefaultReport();

  return (
    <div className="flex p-1.5 font-medium">
      <img
        alt="dropdown"
        className="filtered-black-color rotate-[90deg]"
        src={require("assets/images/dropdown.svg").default}
      />
      <button onClick={goToDefaultReport}>
        <span className="text-green-500">Əsas səhifəyə keç</span>
      </button>
    </div>
  );
};

type PathElementProps = {
  label: string;
  isLastElement: boolean;
};

export const PathElement: React.FC<PathElementProps> = ({
  label,
  isLastElement,
}) => {
  return (
    <div className="flex">
      <button disabled={true}>
        <span
          className={`${isLastElement ? "text-green-500" : "text-inactive"}`}
        >
          {label}
        </span>
      </button>
      {!isLastElement && (
        <img
          alt="dropdown"
          className="filtered-black-color rotate-[270deg]"
          src={require("assets/images/dropdown.svg").default}
        />
      )}
    </div>
  );
};
