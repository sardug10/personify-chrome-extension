import { elements } from "./base";

export const clearWeather = () => {
  elements.weatherDiv.innerHTML = "";
};

export const clearInput = () => {
  elements.locationInput.value = "";
};

export const renderWeather = (result) => {
  const markup = `
        <span class="weather__city">${result.name}</span>
        <span class="weather__temp">${Math.round(
          result.main.temp - 273
        )} &deg;C</span>
        <span class="weather__description">${
          result.weather[0].description
        }</span>
    `;

  elements.weatherDiv.insertAdjacentHTML("afterbegin", markup);
};
