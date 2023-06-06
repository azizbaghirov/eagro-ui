import { registerLocale } from "react-datepicker";

const days = ["B.er", "Ç.ax", "Çşb", "C.ax", "Cüm", "Şmb", "Bzr"];
const months = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "İyun",
  "İyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

export const translateDatePicker = () => {

  registerLocale("az", {
    localize: {
      ordinalNumber: (...args: Array<any>) => null,
      era: (...args: Array<any>) => null,
      quarter: (...args: Array<any>) => null,
      month: (n: number) => months[n],
      day: (n: number) => days[n],
      dayPeriod: (...args: Array<any>) => null,
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
      time: (...args: Array<any>) => null,
      dateTime: (...args: Array<any>) => null,
    },
  });
};