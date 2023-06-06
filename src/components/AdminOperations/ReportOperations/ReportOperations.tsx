import { useEffect, useState } from "react";
import { Table } from "components/Table/Table";
import { ReportForm } from "./ReportForm";
import { ReportAction } from "utils/enums";
import useAlertStore from "store/alertStore";
import { IAlert } from "interfaces/IStore";
import useFileStore from "store/fileStore";
import { fileService } from "services/file.service";
import { IPDFReport } from "interfaces/IPDFReport";

export const ReportOperations = () => {
  const headers: string[] = [
    "Faylın adı",
    "Aid olduğu qoşma",
    "Aid olduğu tarix",
    "Status",
  ];

  const { setAlert } = useAlertStore();
  const { getPDFReportList, pdfReportList, deletePDFReport } = useFileStore();

  const [modalName, setModalName] = useState<string | null>(null);
  const [currentPageNo, setCurrentPageNo] = useState<number>(0);
  const [selectedReport, setSelectedReport] = useState<IPDFReport | null>(null);

  useEffect(() => {
    getReportList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getReportList = (pageNo: number = currentPageNo) => {
    getPDFReportList({
      page: pageNo,
      size: 10,
      sort: "fileDate,desc",
    });
  };

  const confirmDeletePDF = (id: number) => {
    const alert: IAlert = {
      confirmMessage: "Hesabatı silmək istədiyinizdən əminsinizmi?",
      alertAction: () => deletePDFReport(id).then(() => getReportList()),
      isConfirmRequired: true,
    };
    setAlert(alert);
  };

  const handlePageChange = (pageNo: number) => {
    setCurrentPageNo(pageNo);
    getReportList(pageNo);
  };

  const handleStatusChange = (checked: boolean, id: number) => {
    fileService.editStatusPDFReport(checked, id).then(() => getReportList());
  };

  const handleReportEdit = (pdfReport: IPDFReport) => {
    setSelectedReport(pdfReport);
    setModalName(ReportAction.edit);
  };

  return (
    <>
      {modalName && (
        <ReportForm
          title={modalName}
          closeForm={() => setModalName(null)}
          report={selectedReport}
          getReportList={getReportList}
        />
      )}
      <div className="mx-6 mt-5">
        <button
          className="bg-green-500 hover:bg-green-350 text-white rounded h-8 px-4"
          onClick={() => {
            setModalName(ReportAction.create);
            setSelectedReport(null);
          }}
        >
          + Yeni hesabat əlavə et
        </button>
        <Table
          data={pdfReportList?.content}
          headers={headers}
          deleteRow={(id: number) => confirmDeletePDF(id)}
          editRow={(pdfReport: IPDFReport) => handleReportEdit(pdfReport)}
          pageCount={pdfReportList?.totalPages}
          currentPageNo={currentPageNo}
          handlePageChange={(pageNo: number) => handlePageChange(pageNo)}
          handleSwitch={(checked: boolean, id: number) =>
            handleStatusChange(checked, id)
          }
        />
      </div>
    </>
  );
};

export default ReportOperations;

