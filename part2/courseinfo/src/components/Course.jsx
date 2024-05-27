const Course = ({ course }) => {
    return <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
           </div>
  }
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><b>Total of {sum} exercises</b></p>
  }
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => 
    <>
    {
      parts.map(part => <Part part={part} key={part.id}/>)
    }  
    </>

export default Course