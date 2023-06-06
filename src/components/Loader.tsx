import useLoaderStore from "store/loaderStore";

export const Loader = () => {
  const { isLoading } = useLoaderStore();

  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen bg-black-300/50 fixed z-50 flex justify-center items-center">
          <img
            alt="loader"
            className="w-[75px]"
            src={require("assets/images/loader.gif")}
          />
        </div>
      )}
    </>
  );
};
