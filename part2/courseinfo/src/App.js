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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App