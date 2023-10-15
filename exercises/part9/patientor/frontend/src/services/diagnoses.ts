import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default {
  getAll,
};
