function Profile(props) {
  return (
    <a onClick={props.onClick}>
      <div className="profile-card">
        <img className="card-img-top profile-card bg-dark" />
        <p className="text-center mt-2 text-dark fw-bold">{props.name}</p>
      </div>
    </a>
  )
}

export default Profile
