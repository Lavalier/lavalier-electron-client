function ErrorBox(props) {
  if (props.message) {
    return <div className="alert alert-danger">{props.message}</div>
  } else {
    return <div />
  }
}

export default ErrorBox
