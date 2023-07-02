
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ props }) => {
  let exerciseList = props.map((note) => 
    note.exercises
  )
  const sum = exerciseList.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  return (
    <div>
        <h4>total of {sum} exercises</h4>
    </div>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((note) => 
        <Part key={note.id} part = {note}/>
      )}
    </div>
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
    <div>
      {courses.map((course) => 
        <Course key = {course.id} course = {course}/>
      )}
    </div>
  )
}

export { CourseList }