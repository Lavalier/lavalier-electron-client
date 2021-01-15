import usePersistedState from '../usePersistedState'

function VideoPlayer(props) {
  const [currentServer] = usePersistedState('currentServer', {})

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      {/* <div className="container top-view">
        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      </div> */}
      {/* <div className="position-absolute bg-dim top-secondary-view top-0 bottom-0 start-0 end-0"></div> */}
      <video className="position-fixed w-100 h-100 bg-black" preload="auto" autoPlay controls>
        <source src={`${currentServer.address}/api/watch/${props.match.params.id}?token=${currentServer.token}`} />
      </video>
      {/* <div className="position-absolute bottom-0 start-0 end-0">
        <div className="container mb-3"></div>
      </div> */}
    </div>
  )
}

export default VideoPlayer
