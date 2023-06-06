import { IAlert } from "interfaces/IStore";
import useAlertStore from "store/alertStore";

type AlertProps = {
  alert: IAlert | null;
  setAlert?: (allert: IAlert | null) => void;
  closeAlert?: () => void;
};

export const Alert = () => {
  const { alert, setAlert } = useAlertStore();

  const closeAlert = () => {
    setAlert(null);
  };
  return (
    alert && (
      <div
        className={`w-screen h-screen z-50 top-0 left-0 flex justify-center items-center fixed ${
          alert.isAuthError ? "bg-black-300" : "bg-black-300/60"
        } `}
      >
        <Popup alert={alert} closeAlert={closeAlert} />
      </div>
    )
  );
};

export const Popup: React.FC<AlertProps> = ({ alert, closeAlert }) => {

  const alertAction = alert?.alertAction;
  const isConfirmRequired = alert?.isConfirmRequired;
  const errMessage = alert?.errMessage;
  const isAuthError = alert?.isAuthError;
  const confirmMessage = alert?.confirmMessage;

  return (
    <div className="bg-white w-[400px] rounded-md p-8 text-center">
      <div className="pb-5">
        {isAuthError && (
          <img
            className="m-auto"
            alt="error-alert-icon-fill"
            src={require("assets/images/error-alert-fill-icon.svg").default}
          />
        )}
        {errMessage && (
          <img
            className="m-auto"
            alt="error-alert-icon"
            src={require("assets/images/error-alert-icon.svg").default}
          />
        )}
        {confirmMessage && (
          <img
            className="m-auto"
            alt="confirm-alert-icon"
            src={require("assets/images/attention-icon.svg").default}
          />
        )}
      </div>
      <div className="pb-7">
        <span>{errMessage || confirmMessage}</span>
      </div>
      {alertAction &&
        (isConfirmRequired ? (
          <div className="flex justify-evenly">
            <button
              className="bg-white rounded border border-grey-200 hover:border-green-500 hover:text-green-500 w-28 h-8"
              onClick={closeAlert}
            >
              Xeyr
            </button>
            <button
              className="bg-green-500 hover:bg-green-350 text-white rounded w-28 h-8"
              onClick={() => {
                alertAction!();
                closeAlert!();
              }}
            >
              Bəli
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-green-500 text-white rounded w-28 h-8"
              onClick={() => {
                alertAction();
                closeAlert!();
              }}
            >
              Oldu
            </button>
          </div>
        ))}
    </div>
  );
};
