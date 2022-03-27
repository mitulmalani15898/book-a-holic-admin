import axios from "axios";
export default axios.create({
  baseURL:"https://bookaholic-backend.herokuapp.com/api"
});