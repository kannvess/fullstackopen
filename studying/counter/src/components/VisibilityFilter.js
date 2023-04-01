import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      all <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} />
      important <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} />
      nonimportant <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
    </div>
  )
}

export default VisibilityFilter