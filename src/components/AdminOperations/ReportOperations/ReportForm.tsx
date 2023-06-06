import { FC, useEffect } from "react";
import DatePicker from "react-datepicker";
import Switch from "react-switch";
import Select from "react-select";
import { useFormik } from "formik";
import Modal from "components/Layout/Modal";
import { customSelectStyles } from "utils/customStyles";
import useFileStore from "store/fileStore";
import { IFileGroup, IPDFReport } from "interfaces/IPDFReport";
import moment from "moment";
import { ReportAction } from "utils/enums";
import { IAlert } from "interfaces/IStore";
import useAlertStore from "store/alertStore";

type ReportFormProps = {
  title: string;
  closeForm: () => void;
  report: IPDFReport | null;
  getReportList: () => void;
};

export const ReportForm: FC<ReportFormProps> = ({
  title,
  closeForm,
  report,
  getReportList,
}) => {
  const { getFileGroups, fileGroups, createPDFReport, editPDFReport } =
    useFileStore();
  const { setAlert } = useAlertStore();

  const formik = useFormik({
    initialValues: {
      name: report?.name || "",
      fileDate: report
        ? moment(new Date(report?.fileDate)).format("YYYY-MM-DD")
        : "",
      status: report ? report.status : true,
      group: report?.group || undefined,
      file: null,
      originalFileName: report?.originalFileName,
    },
    onSubmit: async (values: IPDFReport) => {
      const payload = {
        ...values,
        groupId: values?.group?.id,
      };
      delete payload.group;
      delete payload.originalFileName;
      !values.file && delete payload.file;
      submitForm(() =>
        title === ReportAction.create
          ? createPDFReport(payload)
          : editPDFReport(payload, report?.id!)
      );
    },

    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      let errors: any = {};
      if (!values.name) {
        errors.name = "Faylın adının daxil edilməsi vacibdir";
      }
      // if (values.name.trim().length < 1 && values.name.trim().length > 255) {
      //   errors.name = "Fayl adının uzunluğu 1-255 simvol olmalıdı";
      // }
      if (!values.group) {
        errors.group = "Qoşmanın seçilməsi vacibdir";
      }
      if (!(values.file || values.originalFileName)) {
        errors.file = "Faylın seçilməsi vacibdir";
      }
      if (!values.fileDate) {
        errors.fileDate = "Tarixin seçilməsi vacibdir";
      }
      return errors;
    },
  });

  useEffect(() => {
    getFileGroups();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = (action: () => Promise<any>) => {
    action()
      .then(() => {
        getReportList();
        closeForm();
      })
      .catch(() => {
        const alert: IAlert = {
          errMessage: "Xəta baş verdi",
          alertAction: () => null,
          isConfirmRequired: false,
        };
        setAlert(alert);
      });
  };

  return (
    <Modal
      header={title}
      close={() => closeForm()}
      submit={() => formik.handleSubmit()}
      isDisabled={!formik.dirty}
    >
      <div className="mb-3">
        <div className="flex flex-col mt-6">
          <label className="pb-2 font-semibold">Aid olduğu qoşma</label>
          <Select
            options={fileGroups}
            getOptionLabel={(option: IFileGroup) => option.name}
            getOptionValue={(option: IFileGroup) => option.id.toString()}
            placeholder="Seçin"
            styles={customSelectStyles}
            onChange={(option) => {
              formik.setFieldValue("group", option);
            }}
            name="groupId"
            value={formik.values.group}
          />
          {formik.errors.group && (
            <div className="text-red text-sm">{formik.errors.group}</div>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <label className="pb-2 font-semibold">Faylın adı</label>
          <input
            className="border border-grey-200 focus:border-green-500 hover:border-green-500 focus:outline-0 rounded-sm px-3 py-1"
            placeholder="Daxil edin"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <div className="text-red text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <label className="pb-2 font-semibold">Fayl</label>
          <div className="flex">
            <input
              accept="application/pdf"
              name="file"
              type="file"
              id="files"
              className="hidden"
              onChange={(e) => {
                e.target.files?.length &&
                  formik.setFieldValue("file", e.target.files[0]);
              }}
            />
            <label
              htmlFor="files"
              className="border border-green-500 hover:bg-green-500 hover:text-white h-6 w-fit rounded-sm text-green-500 px-3 mr-2 cursor-pointer"
            >
              Fayl seç
            </label>
            <div>
              <span className="mr-2">
                {formik.values.file?.name || formik.values.originalFileName}
              </span>
              <button
                className="align-middle"
                onClick={() => {
                  formik.setFieldValue("file", undefined);
                  formik.setFieldValue("originalFileName", undefined)
                }}
              >
                {(formik.values.file?.name ||
                  formik.values.originalFileName) && (
                  <img
                    alt="delete-icon"
                    src={require("assets/images/delete-icon.svg").default}
                  />
                )}
              </button>
            </div>
          </div>
          {formik.errors.file && (
            <div className="text-red text-sm">{formik.errors.file}</div>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <label className="pb-2 font-semibold">Aid olduğu tarix</label>
          <div className="flex relative">
            <DatePicker
              locale="az"
              placeholderText="Tarix seçin"
              dateFormat={"d MMMM, yyyy"}
              selected={
                formik.values.fileDate ? new Date(formik.values.fileDate) : null
              }
              onChange={(date) => {
                formik.setFieldValue(
                  "fileDate",
                  moment(date).format("YYYY-MM-DD")
                );
              }}
              className="border border-grey-200 rounded-sm px-2 focus:outline-0 focus:border-green-500 hover:border-green-500"
            />
            <img
              className="absolute top-1.5 left-44"
              alt="date-picker-icon"
              src={require("assets/images/date-picker-icon.svg").default}
            />
          </div>
          {formik.errors.fileDate && (
            <div className="text-red text-sm">{formik.errors.fileDate}</div>
          )}
        </div>
        <div className="flex flex-col mt-6">
          <label className="pb-2 font-semibold">Status</label>
          <div className="w-24 flex justify-between items-center">
            {formik.values.status ? (
              <span className="text-lightGreen">Aktiv</span>
            ) : (
              <span className="text-red">Deaktiv</span>
            )}
            <Switch
              onColor="#0F766E"
              offColor="#bdbdbd"
              checked={formik.values.status}
              onChange={(checked) => {
                formik.setFieldValue("status", checked);
              }}
              checkedIcon={false}
              uncheckedIcon={false}
              height={18}
              width={40}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
