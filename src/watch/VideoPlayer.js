function VideoPlayer() {
  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="container top-view">
        <div className="text-center">
          <div className="spinner-border" role="status" />
        </div>
      </div>
      <div className="position-absolute bg-dim top-secondary-view top-0 bottom-0 start-0 end-0"></div>
      <video className="position-fixed w-100 h-100" preload="auto">
        <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4" />
      </video>
      <div className="position-absolute bottom-0 start-0 end-0">
        <div className="container mb-3"></div>
      </div>
    </div>
  )
}

export default VideoPlayer
