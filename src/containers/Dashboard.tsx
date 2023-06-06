import useUserStore from "store/userStore";
import { isMobileMode } from "utils/helpers";
import { Breadcrumb, MobileBreadcrumb } from "components/Breadcrumb";
import { Header } from "components/Header";
import { Report } from "components/Reports/Report";
import { SideBar } from "components/SideBar/SideBar";

const Dashboard = () => {
  const { isNavMenuOpened } = useUserStore();

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row ${
        isNavMenuOpened ? "lg:ml-[280px] xl:ml-[346px]" : "lg:ml-0"
      }`}
    >
      <SideBar />
      <div className={`dashboard w-full h-screen bg-stone-100 `}>
        <Header />
        <main
          className={`fixed h-[calc(100%_-_188px)] ${
            isNavMenuOpened
              ? "lg:w-[calc(100%_-_280px)] xl:w-[calc(100%_-_346px)]"
              : "w-full"
          }`}
        >
          {isMobileMode() ? <MobileBreadcrumb /> : <Breadcrumb />}
          <Report />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
