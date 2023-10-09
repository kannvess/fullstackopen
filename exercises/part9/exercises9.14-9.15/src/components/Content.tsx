interface ContentEntry {
  name: string,
  exerciseCount: number,
}

interface ContentProps {
  content: ContentEntry[]
}

const Content = (props: ContentProps):JSX.Element => {
  return (
    <>
    {props.content.map((c) =>
      <p>{c.name} {c.exerciseCount}</p>
    )}
    </>
  )
}

export default Content;