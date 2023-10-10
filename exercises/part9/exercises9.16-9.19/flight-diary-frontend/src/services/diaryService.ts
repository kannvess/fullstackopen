import axios from "axios";
import { Diary } from "../types";

const baseUrl = "/api/diaries";

const getAllDIaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
}

export default {
  getAllDIaries,
};
