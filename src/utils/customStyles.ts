import { StylesConfig, GroupBase } from "react-select";

const styles = require("index.css").default;
const greenPrimary = styles.greenPrimary;
const green150 = styles.green150;
const grey200 = styles.grey200;

export const customSelectStyles:
  | StylesConfig<any, false, GroupBase<any>>
  | undefined = {
  container: (styles: any) => ({
    ...styles,
    "&:focus": {
      borderColor: greenPrimary,
      outline: "none",
    },
  }),
  placeholder: (styles: any) => ({
    ...styles,
  }),
  control: (base: any, state: any) => ({
    ...base,
    boxSizing: "content-box",
    borderRadius: "2px",
    "&:hover": {
      borderColor: greenPrimary,
    },
    borderColor: state.isFocused ? greenPrimary : grey200,
    boxShadow: state.isFocused ? "none" : "none",
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "#fff" : "",
      backgroundColor: isSelected
        ? greenPrimary
        : isFocused
        ? green150
        : isDisabled
        ? null
        : null,

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? "" : ""),
      },
    };
  },
};
