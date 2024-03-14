import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = () => axiosInstance.get<T>(this.endpoint).then((res) => res.data);

  post = (data: T) =>
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
}

export default APIClient;
