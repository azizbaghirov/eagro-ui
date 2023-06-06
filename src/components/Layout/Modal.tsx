import { FC, ReactNode } from "react";

type ModalProps = {
  header: string;
  children: ReactNode;
  isDisabled: boolean;
  close: () => void;
  submit: () => void;
};

const Modal: FC<ModalProps> = ({
  children,
  header,
  isDisabled,
  close,
  submit,
}) => {
  return (
    <div className="w-screen h-screen z-30 flex justify-center items-center fixed top-0 left-0 bg-black-300/60">
      <div className="w-[606px] max-h-[95vh] overflow-auto bg-white shadow-md rounded border">
        <header className="h-14 px-6 border-b flex justify-between items-center">
          <span className="font-bold">{header}</span>
          <button onClick={() => close()}>
            <img
              alt="close-icon"
              src={require("assets/images/close-grey-icon.svg").default}
            />
          </button>
        </header>
        <div className="px-6">{children}</div>
        <div className="h-16 px-6 border-t flex justify-between items-center">
          <button
            className="h-8 px-4 py-1 rounded-sm border border-grey-200 border-solid hover:border-green-500 hover:text-green-500"
            onClick={() => close()}
          >
            Bağla
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            onClick={() => submit()}
            className="h-8 px-4 py-1 disabled:hover:bg-green-500 rounded-sm border border-solid bg-green-500 hover:bg-green-350 text-white"
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
