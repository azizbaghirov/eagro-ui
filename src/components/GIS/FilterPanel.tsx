import * as React from "react";
import Select from "react-select";
import * as EL from "esri-leaflet";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FieldsLabel } from "utils/enums";
import { customSelectStyles } from "utils/customStyles";
import { FILTER_VALUES, ORGS_LIST } from "utils/constants";

type FilterPanelProps = {
  searchQuery: (q: string) => void;
  resetMap: () => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  resetMap,
}) => {
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [factUseList, setFactUseList] = useState<any[]>([]);
  const [orgsList, setOrgList] = useState<any[]>([[]]);

  useEffect(() => {
    const savedValues = window.localStorage.getItem(FILTER_VALUES);
    savedValues ? setInitValues(savedValues) : getFirstOrgList();
    getList("district", setDistrictList);
    getList("factUse", setFactUseList);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setInitValues = (savedForm: string) => {
    const values = JSON.parse(savedForm);
    formik.setValues(values);
    const savedOrgsList = window.localStorage.getItem(ORGS_LIST);
    const orgsListInit = JSON.parse(savedOrgsList!);
    setOrgList(orgsListInit);
  };

  interface formikValues {
    selectedOrgs: string[];
    district: string;
    factUse: string;
  }

  const formik = useFormik<formikValues>({
    initialValues: {
      selectedOrgs: [],
      district: "",
      factUse: "",
    },
    onSubmit: (values: formikValues) => {
      if (formik.dirty || values.selectedOrgs.length) {
        localStorage.setItem(FILTER_VALUES, JSON.stringify(values));
        localStorage.setItem(ORGS_LIST, JSON.stringify(orgsList));
        search(values);
      }
    },
  });

  const search = (payload: any) => {
    const query = createQuery(payload);
    searchQuery(query);
  };

  const handleReset = () => {
    formik.resetForm({
      values: { selectedOrgs: [], district: "", factUse: "" },
    });
    localStorage.removeItem(FILTER_VALUES);
    localStorage.removeItem(ORGS_LIST);
    setOrgList((orgsList) => [orgsList[0]]);
    getList("district", setDistrictList);
    getList("factUse", setFactUseList);
    resetMap();
  };

  const createQuery = (payload: any): string => {
    let query: string = "";
    let queryArr: string[] = [];

    Object.keys(payload).forEach((key) => {
      if (Array.isArray(payload[key])) {
        payload[key].length &&
          payload[key].forEach((value: any, index: number) => {
            queryArr.push(
              `${FieldsLabel.organization}${index + 1} like '%${value.data}%'`
            );
          });
      } else if (payload[key]) {
        queryArr.push(
          `${FieldsLabel[key as keyof typeof FieldsLabel]} like '%${
            payload[key].data
          }%' `
        );
      }
    });
    query = queryArr.join(" AND ");
    return query;
  };

  const getList = (
    fieldName: string,
    setList: (list: any) => void,
    query?: string
  ) => {
    var q = EL.query({ url: `${process.env.REACT_APP_MAP_SERVER}/3` })
      .where(query || "Qurum_1 like '%%'")
      .fields([FieldsLabel[fieldName as keyof typeof FieldsLabel]])
      .orderBy(FieldsLabel[fieldName as keyof typeof FieldsLabel], "DESC")
      .returnGeometry(true)
      .distinct();

    q.run((error, featureCollection) => {
      let list: any[] = featureCollection.features.map((feature: any) => ({
        data: feature.properties[
          FieldsLabel[fieldName as keyof typeof FieldsLabel]
        ],
      }));
      setList(list);
    });
  };

  const getFirstOrgList = () => {
    var q = EL.query({ url: `${process.env.REACT_APP_MAP_SERVER}/3` })
      .fields(["Qurum_1"])
      .returnGeometry(false)
      .distinct();

    q.run((error, featureCollection) => {
      const newOrgList = [
        {
          data: featureCollection.features[0].properties["Qurum_1"],
        },
      ];
      setOrgList([newOrgList]);
    });
  };

  const handleOrgChange = (index: number, org: string) => {
    let { selectedOrgs } = formik.values;
    selectedOrgs[index] = org;
    selectedOrgs.length = index + 1;
    formik.setFieldValue(`selectedOrgs`, selectedOrgs);
    let query: string = createQuery({ selectedOrgs });
    formik.setFieldValue("factUse", "");
    formik.setFieldValue("district", "");
    getList("district", setDistrictList, query);
    getList("factUse", setFactUseList, query);
    const nextOrgLabelIndex = index + 2;
    getNextOrgList(query, nextOrgLabelIndex);
  };

  const getNextOrgList = (query: string, index: number) => {
    var q = EL.query({ url: `${process.env.REACT_APP_MAP_SERVER}/3` })
      .where(query)
      .fields([FieldsLabel.organization + index])
      .orderBy(FieldsLabel.organization + index, "DESC")
      .returnGeometry(true)
      .distinct();

    q.run((error, featureCollection) => {
      let list: any[] = [];
      featureCollection.features.forEach((feature: any) => {
        const value = feature.properties[FieldsLabel.organization + index];
        if (value !== null) list.push({ data: value });
      });

      if (list.length > 0) {
        switch (index) {
          case 6: {
            setOrgList([...orgsList, ...list]);
            break;
          }
          default: {
            let newOrgs = [...orgsList];
            newOrgs[index - 1] = list;
            newOrgs.length = index;
            setOrgList(newOrgs);
            break;
          }
        }
      } else {
        let newOrgs = [...orgsList];
        newOrgs.length = index - 1;
        setOrgList(newOrgs);
      }
    });
  };

  return (
    <div>
      <div className="h-[130px] xl:h-auto overflow-auto xl:overflow-visible px-5 py-3 xl:pt-6 xl:pb-0">
        <p className="mb-2 font-semibold">Qurumlar</p>
        <div className="flex flex-col gap-4 mb-3 xl:mb-5">
          {orgsList.map((organization, index) => (
            <Select
              options={organization}
              placeholder="Seçin"
              styles={customSelectStyles}
              onChange={(option) => {
                handleOrgChange(index, option);
              }}
              key={`unique_select_${JSON.stringify(
                formik.values.selectedOrgs[index]
              )}`}
              name={`selectedOrgs.${index}`}
              getOptionLabel={(option) => option.data}
              getOptionValue={(option) => option.data}
              value={formik.values.selectedOrgs[index]}
            />
          ))}
        </div>
        <p className="mb-2 font-semibold">Rayon</p>
        <div className="mb-3 xl:mb-4">
          <Select
            options={districtList}
            placeholder="Seçin"
            styles={customSelectStyles}
            onChange={(option) => {
              formik.setFieldValue("district", option);
            }}
            name="district"
            getOptionLabel={(option) => option.data}
            getOptionValue={(option) => option.data}
            value={formik.values.district}
          />
        </div>
        <p className="mb-2 font-semibold">Torpaq sahəsi</p>
        <div className="mb-3 xl:mb-4">
          <Select
            options={factUseList}
            placeholder="Seçin"
            styles={customSelectStyles}
            onChange={(option) => {
              formik.setFieldValue("factUse", option);
            }}
            name="factUse"
            getOptionLabel={(option) => option.data}
            getOptionValue={(option) => option.data}
            value={formik.values.factUse}
          />
        </div>
      </div>
      <div className="flex justify-between px-5 py-3 xl:py-6">
        <button
          onClick={() => formik.submitForm()}
          className="bg-white rounded border bg-green-500 text-white w-32 h-8"
        >
          Axtar
        </button>
        <button
          onClick={handleReset}
          className="bg-white rounded border border-green-500 text-green-500 w-28 h-8"
        >
          Filteri təmizlə
        </button>
      </div>
    </div>
  );
};
