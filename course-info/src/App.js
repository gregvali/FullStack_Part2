
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ props }) => {
  let exerciseList = props.map((note) => 
    note.exercises
  )
  console.log(exerciseList)
  const sum = exerciseList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return (
    <ul>
      <li>
        total of {sum} exercises
      </li>
    </ul>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((note, i) => 
        <li key={i}>
          <Part part = {note}/>
        </li>
      )}
    </ul>
  )
}

const Course = ( {course} ) =>{
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total props={course.parts}/>
    </div>
  )
}

const CourseList = ( {courses} ) =>{
  return (
    <ul>
      {courses.map((course, i) => 
        <li key={i}>
          <Course key = {course.id} course = {course}/>
        </li>
      )}
    </ul>
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

  return <CourseList courses={courses}/>
}

export default App;
