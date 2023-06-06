import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useReportStore from "store/reportStore";
import useUserStore from "store/userStore";
import { Device } from "utils/enums";

export const Report = () => {
  let [searchParams] = useSearchParams();
  const { reportUrl, reportParams, setReportParams, setBreadcrumb } =
    useReportStore();

  const { device } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    let reportParams = searchParams.get("name")?.split("/") || [];
    setReportParams(reportParams);
    setBreadcrumb(reportParams);
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const isDesktopDeviceRequired = () => {
    return reportParams[reportParams.length - 1] === "EkinSubsidiyaMuracieti";
  };

  return (
    <>
      {reportUrl && (
        <embed
          className="w-full h-full bg-stone-100"
          title="report"
          src={
            reportUrl +
            `&:device=${isDesktopDeviceRequired() ? Device.Desktop : device}`
          }
        ></embed>
      )}
    </>
  );
};
