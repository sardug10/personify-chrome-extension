import { elements } from "./base";

export const displayName = (name) => {
  const date = new Date();
  const hour = date.getHours();
  document.querySelector(
    ".greet__salutation"
  ).innerHTML = `Good ${getSalutation(hour)}, ${name}`;
};

export const clearNameInput = () => {
  elements.nameInput.value = "";
};

export const renderTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const ap = getAP(hour);

  const markup = `
    <h1 class="greet__hour">${perfectHour(hour)}:${perfectminute(
    minutes
  )}<span class="greet__ap">${ap}</span></h1>
  `;

  elements.timeField.innerHTML = "";
  elements.timeField.insertAdjacentHTML("afterbegin", markup);
};

const perfectHour = (hour) => {
  var newHour;
  if (hour >= 0 && hour <= 9) {
    newHour = `0${hour}`;
    return newHour;
  } else {
    return hour;
  }
};

const perfectminute = (minute) => {
  var newminute;
  if (minute >= 0 && minute <= 9) {
    newminute = `0${minute}`;
    return newminute;
  } else {
    return minute;
  }
};
const getAP = (hour) => {
  var ap;
  if (hour >= 0 && hour <= 12) {
    ap = "a.m.";
  } else {
    ap = "p.m.";
  }

  return ap;
};

const getSalutation = (hours) => {
  var salutaion;
  if (hours >= 12 && hours <= 17) {
    salutaion = "afternoon";
  } else if (hours >= 4 && hours <= 12) {
    salutaion = "morning";
  } else {
    salutaion = "evening";
  }

  return salutaion;
};
