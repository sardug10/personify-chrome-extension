import axios from "axios";

export default class Weather {
  constructor(query) {
    this.query = query;
  }

  async getWeather() {
    try {
      const res = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.query}&appid=fc29e31dd3af50aabb567f22a8230629`
      );
      this.result = res.data;
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}
