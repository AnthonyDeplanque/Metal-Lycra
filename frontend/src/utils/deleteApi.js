import axios from "axios";

const deleteApi = async (route) => {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/${route}`)
    .then((r) => r.data);
};
export default deleteApi;
