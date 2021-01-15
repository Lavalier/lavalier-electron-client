function MoviePosterCard(props) {
  return (
    <a onClick={props.onClick} className={props.className}>
      <div className="poster-card">
        <img className="card-img-top poster-card bg-dark" src={props.poster} />
        <p className="text-start mt-2 text-white fw-bold">
          {props.name}
          <br />
          <span className="text-white-50">{props.subtitle}</span>
        </p>
      </div>
    </a>
  )
}

// http://image.tmdb.org/t/p/original//51JxCk77ZCqLzbLkrDl9Qho6KUh.jpg

export default MoviePosterCard
