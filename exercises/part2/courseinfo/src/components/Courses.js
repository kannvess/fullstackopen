const Part = ({name, exercises}) =>
  <p>
    {name} {exercises}
  </p>


const Content = ({name, parts}) =>
  <>
    <h2>
      {name}
    </h2>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <p>
      <b>
        total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </b>
    </p>
  </>

const Courses = ({courses}) => {
  return courses.map(course =>
    <Content key={course.id} name={course.name} parts={course.parts} />
  )
}

export default Courses