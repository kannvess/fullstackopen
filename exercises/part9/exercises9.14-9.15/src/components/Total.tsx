interface TotalProps {
  total: number
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

export default Total;