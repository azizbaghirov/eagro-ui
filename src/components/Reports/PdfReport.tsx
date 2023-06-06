import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import { IFile } from "interfaces/IPDFReport";
import useFileStore from "store/fileStore";
import { isMobileDevice } from "utils/helpers";

export const PdfReport = () => {
  let [searchParams] = useSearchParams();

  const {
    getFilesDateRange,
    getFilesData,
    getFilesByDate,
    filesData,
    filesDateRange,
  } = useFileStore();

  const [selectedFile, setSelectedFile] = useState<IFile | null>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateReport, toggleDateReport] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    let id = searchParams.get("id");
    let dateParam = searchParams.get("date");
    id && (dateParam ? getFilesDateRange(id) : getFilesData(id));
    toggleDateReport(!!dateParam);
    id && setId(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectedFile(filesData?.files[0]);
  }, [filesData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filesDateRange?.length &&
      id &&
      getFilesByDate(id, filesDateRange[filesDateRange?.length - 1]);
      setSelectedDate(filesDateRange && new Date(filesDateRange[filesDateRange.length - 1]))
  }, [filesDateRange]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectFile = (file: IFile) => {
    setSelectedFile(file);
    isMobileDevice() && downloadFile(file.filePath);
  };

  const downloadFile = (filePath: string) => {
    window.location.href = `${filePath}/attachment`;
  };

  const filterFileByDate = (date: any) => {
    const formatedDate = moment(new Date(date)).format("YYYY-MM");
    getFilesByDate(id, formatedDate);
    setSelectedDate(date);
  };

  return (
    <div className="border-solid border rounded-md m-5 bg-white">
      <div className="border-b">
        <h1 className="text-2xl font-semibold py-3 text-center">
          {filesData?.name}
        </h1>
      </div>
      {isDateReport && (
        <div className="border-b p-4">
          <p className="font-semibold pb-2">Tarix</p>
          <div className="flex w-fit">
            <DatePicker
              locale="az"
              selected={selectedDate}
              onChange={(date: any) => filterFileByDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              minDate={filesDateRange && new Date(filesDateRange[0])}
              maxDate={
                filesDateRange &&
                new Date(filesDateRange[filesDateRange.length - 1])
              }
              className="border rounded-md px-2"
            />
            <img
              className="absolute left-[215px] top-[132px]"
              alt="date-picker-icon"
              src={require("assets/images/date-picker-icon.svg").default}
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-[auto] md:grid-cols-[280px_auto] h-[1100px]">
        <div className="border-solid border-r p-3 overflow-auto scrollbar-thumb-grey-100 scrollbar-thumb-rounded-full scrollbar-thin">
          {filesData?.files.length ? (
            filesData.files.map((file) => (
              <PdfReportNameBox
                isSelected={selectedFile?.id === file.id}
                file={file}
                selectFile={(file: IFile) => {
                  selectFile(file);
                }}
              />
            ))
          ) : (
            <p className="text-grey-250 ml-2">
              Bu ay üçün PDF hesabat mövcud deyil.
            </p>
          )}
        </div>
        <div className="p-5 hidden md:block">
          <h2 className="text-xl font-semibold text-grey-300">
            {selectedFile?.name}
          </h2>
          {selectedFile && (
            <embed
              title="pdf"
              className="pt-5 w-full h-[98%]"
              src={`${selectedFile.filePath}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

type PdfReportNameBoxProps = {
  isSelected: boolean;
  file: IFile;
  selectFile: (file: IFile) => void;
};

const PdfReportNameBox: React.FC<PdfReportNameBoxProps> = ({
  isSelected,
  file,
  selectFile,
}) => {
  return (
    <div
      className={`py-4 px-2 hover:shadow-md mb-5 cursor-pointer border border-grey-200 ${
        isSelected ? "bg-white shadow-md" : "bg-grey-50"
      } `}
      onClick={() => selectFile(file)}
    >
      <p
        className={`text-sm pb-1 ${
          isSelected ? "text-green-500 font-semibold" : "text-black-200"
        }`}
      >
        {file.name}
      </p>
      <div className="flex">
        <img
          className="pr-3 filtered-black-color"
          alt="date-picker-icon"
          src={require("assets/images/date-picker-icon.svg").default}
        />
        <p className="text-xs">
          {moment(new Date(file.fileDate)).format("DD.MM.YYYY")}
        </p>
      </div>
    </div>
  );
};
