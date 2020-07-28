import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://burger-builder-5ef56.firebaseio.com/",
});

export default instance;
