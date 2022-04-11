/** * @author Prit Thakkar (B00890731) */

/** Exports a reusable axios tweak to point to the deployed backend */
import axios from "axios";

export default axios.create({
  baseURL:"https://bookaholic-backend.herokuapp.com/api"
});