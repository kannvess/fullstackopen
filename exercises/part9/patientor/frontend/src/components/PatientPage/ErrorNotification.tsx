interface Props {
  errorMessage: string | null;
}

const ErrorNotification = (props: Props) => {
  if (!props.errorMessage) {
    return null;
  }
  
  return (
    <div style={{ backgroundColor: 'lightsalmon', color: 'black' }}>
      <p style={{ padding: 5 }}>{props.errorMessage.replace('Something went wrong. Error: ', '')}</p>
    </div>
  );
};

export default ErrorNotification;
