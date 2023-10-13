interface NotificationProps {
  errorMessage: string;
}

const Notification = (props: NotificationProps): JSX.Element | null => {
  if (!props) return null;
  
  return (
    <p style={{color: 'red'}}>{props.errorMessage}</p>
  )
}

export default Notification