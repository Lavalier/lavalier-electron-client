import LogoText from '../common/LogoText'

function LoadingScreen() {
  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <div className="text-center">
            <div class="spinner-border" role="status" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
