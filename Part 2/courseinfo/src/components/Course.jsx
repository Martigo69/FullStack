const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
      {parts.map(part => <Part key={part.id}  part={ part.name } exercises = { part.exercises } />)}
      </>
    )
  }

  const Total = ({ parts }) => {
    return (
      <p>Number of exercises {parts.reduce((sum , part) => {
        return sum + part.exercises
      }, 0)}</p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course