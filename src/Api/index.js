import axios from "axios";
export const SERVER_URL = "http://localhost:5050";
export const API_URL = "http://localhost:5050/api";

export class Api {
  static rootUrl = API_URL;

  static async base() {
    const instance = axios.create({
      baseURL: this.rootUrl,
      timeout: 50000,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
      },
    });

    const token = "token";
    instance.defaults.headers.Authorization = `Bearer ${token}`;

    return instance;
  }

  static async request(options) {
    const base = await this.base();
    return base.request(options).then((response) => {
      return response;
    });
  }

  static async get(url, options) {
    const base = await this.base();
    return base.get(url, options).then((response) => {
      return response;
    });
  }

  static async post(url, options) {
    const base = await this.base();
    return base.post(url, options).then((response) => {
      return response;
    });
  }

  static async put(url, options) {
    const base = await this.base();
    return base.put(url, options).then((response) => {
      return response;
    });
  }

  static async patch(url, options) {
    const base = await this.base();
    return base.patch(url, options).then((response) => {
      return response;
    });
  }

  static async delete(url, options) {
    const base = await this.base();
    return base.delete(url, options).then((response) => {
      return response;
    });
  }

  static handleError(error) {
    console.log(error);
    if (error.response) {
      const { data } = error.response;
      if (data.errors) {
        const errors = data.errors;
        try {
          if (errors instanceof Array) {
            alert(errors[0].detail, errors[0].title);
          } else if (typeof errors === "object") {
            alert(Object.values(errors)[0]);
          }
        } catch (caughtError) {
          alert("Something went wrong, please try again");
        }
      } else {
        alert(data);
      }
    } else if (error.request) {
      alert("Something went wrong, please try again");
    } else {
      alert(error.message);
    }
  }
}
