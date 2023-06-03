const Total = ({parts}) => {
    const totalNum = parts.reduce(
        (acc, curr) => acc + curr.exercises
      , 0)
  
    return(
      <h4>total of {totalNum} exercises </h4>
    )
}

export default Total