import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  contents: CoursePart[];
}

const Content = (props: ContentProps):JSX.Element => {
  return (
    <div>
    {props.contents.map((part) =>
      <Part key={part.name} content={part} />
    )}
    </div>
  )
}

export default Content;