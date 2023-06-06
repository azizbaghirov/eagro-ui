import useDefaultReport from "hooks/useDefaultReport";

export const SideBarHeader = () => {
  const [goToDefaultReport] = useDefaultReport();

  return (
    <div className="hidden lg:block">
      <button
        className="flex justify-start items-center p-4 pl-6 relative w-[280px] xl:w-[346px] h-[84px]"
        onClick={goToDefaultReport}
      >
        <img
          className="pr-4"
          src={require("assets/images/dns-green-logo.svg").default}
          alt="dns-logo"
        />
        <span className="text-green-500 text-4xl self-center">DNS</span>
      </button>
    </div>
  );
};
