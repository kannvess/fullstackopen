export interface Diary {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;
