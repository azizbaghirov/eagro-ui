import { TOKEN, USER } from "./constants";
import { Device } from "./enums";

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER);
  if (typeof user === "string") {
    return JSON.parse(user);
  }
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getTokenFromStorage = () => {
  return localStorage.getItem(TOKEN);
};

const isVerticalScreen = (): boolean => {
  const { innerWidth, innerHeight } = window;
  return innerHeight > innerWidth;
};

const isTouchScreen = (): boolean => {
  if ("maxTouchPoints" in navigator) {
    return navigator.maxTouchPoints >= 1;
  } else {
    return false;
  }
};

export const isMobileMode = (): boolean => {
  const device = detectDevice();
  return (
    isTouchScreen() && (device === Device.Tablet ? isVerticalScreen() : true)
  );
};

export const isMobileDevice = (): boolean => {
  const device = detectDevice();
  return device === Device.Mobile;
};

export const detectDevice = (): string => {
  const { innerWidth } = window;
  let device: string = "";
  switch (true) {
    case innerWidth > 1400: {
      device = Device.Desktop;
      break;
    }
    case innerWidth <= 1400 && innerWidth > 601: {
      device = Device.Tablet;
      break;
    }
    case innerWidth <= 601: {
      device = Device.Mobile;
      break;
    }
  }
  return device;
};

export const roundDecimalNumber = (decimalNumber: number):number => {
  return Math.round(decimalNumber * 1e3) / 1e3
}
