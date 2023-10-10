import { CoursePart } from "../types";

interface PartProps {
  content: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error (`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const Part = (props: PartProps): JSX.Element => {
  switch (props.content.kind) {
    case "basic":
      return (
        <>
          <p>
            <b>{props.content.name} {props.content.exerciseCount}</b>
            <br />
            <i>{props.content.description}</i>
          </p>
        </>
      )
    case "group":
      return (
        <>
          <p>
            <b>{props.content.name} {props.content.exerciseCount}</b>
            <br />
            project exercises {props.content.groupProjectCount}
          </p>
        </>
      )
    case "background":
      return (
        <>
          <p>
            <b>{props.content.name} {props.content.exerciseCount}</b>
            <br />
            <i>{props.content.description}</i>
            <br />
            submit to {props.content.backgroundMaterial}
          </p>
        </>
      )
    case "special":
      return (
        <>
          <p>
            <b>{props.content.name} {props.content.exerciseCount}</b>
            <br />
            <i>{props.content.description}</i>
            <br />
            required skills: {props.content.requirements.join(', ')}
          </p>
        </>
      )
    default:
      assertNever(props.content);
      return <></>;
  }
}

export default Part;