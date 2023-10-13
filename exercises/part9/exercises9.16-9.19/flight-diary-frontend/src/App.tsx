import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { Diary } from "./types";
import Notification from "./components/Notification";
import { AxiosError } from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDiaries = async () => {
      const fetchedDiaries = await diaryService.getAllDIaries();
      setDiaries(fetchedDiaries);
    }

    fetchDiaries();
  }, [])

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    }

    
    try {
      const addedDiary = await diaryService.postDiary(diaryToAdd);
      setDiaries(diaries.concat(addedDiary));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data)
      }
    }

    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  }
  
  return (
    <div>
      <div>
        <h1>Add new entry</h1>
        <Notification errorMessage={errorMessage} />
        <form onSubmit={submit}>
          <label>
            date:
            {' '}
            <input
              value={newDate}
              onChange={({ target }) => setNewDate(target.value)}
            />
          </label>
          <br />
          <label>
            visibility:
            {' '}
            <input
              value={newVisibility}
              onChange={({ target }) => setNewVisibility(target.value)}
            />
          </label>
          <br />
          <label>
            weather:
            {' '}
            <input
              value={newWeather}
              onChange={({ target }) => setNewWeather(target.value)}
            />
          </label>
          <br />
          <label>
            comment:
            {' '}
            <input
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            />
          </label>
          <br />
          <button type="submit">add</button>
        </form>
      </div>
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
    </div>
  );
}

export default App;
