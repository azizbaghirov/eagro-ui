import useUserStore from "store/userStore";
import { Header } from "components/Header";
import useAdminStore from "store/adminStore";
import { SideBar } from "components/SideBar/SideBar";

const AdminPanel = () => {
  const { isNavMenuOpened } = useUserStore();
  const { selectedOperation } = useAdminStore();

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row ${
        isNavMenuOpened ? "lg:ml-[280px] xl:ml-[346px]" : "lg:ml-0"
      }`}
    >
      <SideBar />
      <div className={`dashboard w-full h-full bg-stone-100 `}>
        <Header />
        <main
          className={`fixed h-[calc(100vh_-_84px)] ${
            isNavMenuOpened
              ? "lg:w-[calc(100%_-_280px)] xl:w-[calc(100%_-_346px)]"
              : "w-full"
          }`}
        >
          {selectedOperation?.path && (
            <embed
              className="w-full h-full bg-stone-100"
              title="report panel"
              src={selectedOperation?.path}
            ></embed>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
