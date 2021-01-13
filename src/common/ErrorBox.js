function ErrorBox(props) {
  if (props.message) {
    return <div class="alert alert-danger">{props.message}</div>
  } else {
    return <div />
  }
}

export default ErrorBox
