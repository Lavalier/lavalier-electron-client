function ServerName(props) {
  if (props.secure) {
    return (
      <p className="text-center">
        <i className="icon-lock icons right align-middle text-green"></i>
        <span className="text-center align-middle text-success fs-4 fw-normal">{props.address}</span>
      </p>
    )
  } else {
    return (
      <p className="text-center">
        <i className="icon-lock-open icons right align-middle text-warning"></i>
        <span className="text-center align-middle text-warning fs-4 fw-normal">{props.address}</span>
      </p>
    )
  }
}

export default ServerName
