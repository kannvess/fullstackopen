import axios from "axios";
import { NewNote, Note } from "../types";

const baseUrl = 'http://localhost:3001/notes';

export const getAllNotes = () => {
  return axios
    .get<Note[]>(baseUrl)
    .then((response) => response.data);
}

export const createNote = (object: NewNote) => {
  return axios
    .post<Note>(baseUrl, object)
    .then((response) => response.data);
}