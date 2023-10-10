import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { Diary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const fetchedDiaries = await diaryService.getAllDIaries();
      setDiaries(fetchedDiaries);
    }

    fetchDiaries();
  }, [])  
  
  return (
    <div>
      <h1>Diary entries</h1>
    {diaries.map((diary) =>
      <div key={diary.id}>
        <h2>{diary.date}</h2>
        <p>
          visibility: {diary.visibility}
          <br />
          weather: {diary.weather}
        </p>
      </div>
    )}
    </div>
  );
}

export default App;
