import ReactDOM from 'react-dom/client'

// interface WelcomePRops {
//   name: string;
// }

// const Welcome = (props: WelcomePRops): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>
// }

const Welcome = ({name}: {name: string}): JSX.Element => <h1>Hello, {name}</h1>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)
