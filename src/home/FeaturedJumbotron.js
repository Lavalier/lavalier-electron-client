function FeaturedJumbotron(props) {
  return (
    <div className="featured">
      <h1 className="display-1 text-white">{props.content_title}</h1>
      <h4 className="text-white">
        {props.release_date} ‧ {props.genres} ‧ {props.runtime}
      </h4>
      <h4 className="text-white mt-5 w-50">{props.summary}</h4>
      <button className="btn btn-danger fw-bolder mt-4" onClick={props.onPlay}>
        <i className="icon-control-play icons right align-middle" />
        <span className="align-middle">Play</span>
      </button>
      <button className="btn btn-secondary fw-bolder mt-4 ms-3">
        <i className="icon-info icons right align-middle" />
        <span className="align-middle">Details</span>
      </button>
      <button className="btn btn-secondary btn-lg mt-4 ms-3 rounded-pill float-end" onClick={props.onClick}>
        {props.muted ? (
          <i className="icon-volume-off icons align-middle" />
        ) : (
          <i className="icon-volume-2 icons align-middle" />
        )}
      </button>
    </div>
  )
}

export default FeaturedJumbotron
