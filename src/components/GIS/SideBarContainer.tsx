import { FilterPanel } from "components/GIS/FilterPanel";
import { IOrganizationInfo } from "interfaces/IMap";
import React, { useEffect, useState } from "react";
import { mapTabs } from "utils/enums";

type SideBarContainerProps = {
  selectedFeature: IOrganizationInfo;
  area: number;
  searchQuery: (q: string) => void;
  resetMap: () => void;
  filterLayer: any;
};

export const SideBarContainer: React.FC<SideBarContainerProps> = ({
  selectedFeature,
  area,
  filterLayer,
  searchQuery,
  resetMap,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(mapTabs.filter);
  const [isContainerShow, toggleIsContainerShow] = useState<boolean>(true);

  useEffect(() => {
    if (selectedFeature) {
      setSelectedTab(mapTabs.info);
    }
  }, [selectedFeature]);

  const renderPanel = () => {
    switch (selectedTab) {
      case mapTabs.filter:
        return (
          <>
            <FilterPanel
              searchQuery={(q: string) => searchQuery(q)}
              resetMap={resetMap}
            />
            {filterLayer && (
              <div className="border-t-2 px-5 py-3">
                {area ? (
                  <p className="text-grey-300">
                    <span className="font-semibold">{`${area} ha `}</span>
                    ərazi tapıldı
                  </p>
                ) : (
                  <p>Nəticə tapılmadı</p>
                )}
              </div>
            )}
          </>
        );
      case mapTabs.info:
        return <Info data={selectedFeature} />;
    }
  };

  type InfoProps = {
    data: IOrganizationInfo;
  };

  const Info: React.FC<InfoProps> = ({ data }) => {
    return (
      <div className="px-5 py-3 xl:h-auto overflow-auto xl:overflow-visible">
        {data?.organizations.length && (
          <div className="mb-4">
            {data?.organizations.map((org) => (
              <p className="font-semibold">{org}/</p>
            ))}
          </div>
        )}
        <div className="flex justify-between mb-3 xl:mb-6">
          <label>Faktiki istifadə</label>
          <p className="font-semibold">{data?.factUse || ""}</p>
        </div>
        <div className="flex justify-between mb-3 xl:mb-6">
          <label>Faktiki sahəsi, hektarla</label>
          <p className="font-semibold">{data?.factArea || ""}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <Tabs
        switchTab={setSelectedTab}
        selectedTab={selectedTab}
        showContainer={() => {
          !isContainerShow && toggleIsContainerShow(true);
        }}
      />
      {isContainerShow && (
        <div className="bg-white w-full rounded">
          <div className="border-b-2">
            <div className="flex justify-between py-2 px-5 xl:py-6">
              <p className="font-bold">{selectedTab}</p>
              <button onClick={() => toggleIsContainerShow(false)}>
                <img
                  className="filtered-black-color"
                  alt="constrict-icon"
                  src={require("assets/images/close-icon.svg").default}
                />
              </button>
            </div>
          </div>
          <div>{renderPanel()}</div>
        </div>
      )}
    </div>
  );
};

type TabsProps = {
  switchTab: (tabLabel: string) => void;
  selectedTab: string;
  showContainer: () => void;
};

const Tabs: React.FC<TabsProps> = ({
  switchTab,
  selectedTab,
  showContainer,
}) => {
  const renderTabButton = (label: string, iconUrl: string) => {
    return (
      <li>
        <button
          onClick={() => {
            switchTab(label);
            showContainer();
          }}
          className={`${
            selectedTab === label ? "bg-green-500" : "bg-white"
          } rounded h-10 w-10 xl:h-14 xl:w-14`}
        >
          <img
            className={`${
              selectedTab === label ? "filtered-white-color" : ""
            } m-auto h-4 w-4 xl:h-auto xl:w-auto`}
            alt="icon"
            src={iconUrl}
          />
        </button>
      </li>
    );
  };

  return (
    <div className="sidebar-tabs">
      <ul className="flex gap-6 mb-3">
        {renderTabButton(
          mapTabs.filter,
          require("assets/images/filter-icon.svg").default
        )}
        {renderTabButton(
          mapTabs.info,
          require("assets/images/info-icon.svg").default
        )}
      </ul>
    </div>
  );
};
