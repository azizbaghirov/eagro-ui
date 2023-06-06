import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useReportStore from "store/reportStore";
import { INavItem } from "interfaces/INavigation";

export default function useDefaultReport() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    reportParams,
    defaultReportParams,
    reports,
    setDefaultReportParams,
  } = useReportStore();

  useEffect(() => {
    if (reports.length) {
      let defaultReportParams = getDefaultReportParams(reports[0], [
        reports[0].name,
      ]);
      setDefaultReportParams(defaultReportParams);
    }
  }, [reports]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    defaultReportParams && !reportParams?.length && goToDefaultReport();
  }, [defaultReportParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDefaultReportParams = (
    navItem: INavItem,
    defaultParam: string[]
  ): string[] => {
    if (navItem.reports.length) {
      return [...defaultParam, navItem.reports[0].name];
    } else {
      const { children } = navItem;
      if (children.length) {
        for (let i = 0; i < children.length; i++) {
          return getDefaultReportParams(children[i], [
            ...defaultParam,
            children[i].name,
          ]);
        }
      }
    }
    return [];
  };

  const goToDefaultReport = () => {
    if (
      JSON.stringify(reportParams) !== JSON.stringify(defaultReportParams) ||
      location.pathname !== "/report/q"
    ) {
      const defaultNavPath = defaultReportParams.join("/");
      navigate({
        pathname: "/report/q",
        search: createSearchParams({
          name: defaultNavPath,
        }).toString(),
      });
    }
  };

  return [goToDefaultReport];
}
