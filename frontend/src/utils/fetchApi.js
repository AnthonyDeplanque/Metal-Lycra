import axios from "axios";

const fetchApi = async (route ) =>{
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/${route}` )
    .then((r)=>r.data)
};
export default fetchApi;