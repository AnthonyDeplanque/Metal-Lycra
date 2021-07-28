import axios from "axios";

const postApi = async (route, values) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/${route}`, values)
    .then((r) => r.data);
};
export default postApi;
