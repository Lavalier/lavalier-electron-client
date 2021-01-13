import LogoText from '../common/LogoText'

function ServerLogin(props) {
  return (
    <div class="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="row">
          <div className="col">Hey</div>
          <div className="col">
            <div className="d-grid">
              <LogoText />
              <p className="text-center">
                Welcome to Lavalier! Enter a server address in the field below to access Lavalier content.
                <br />
                New to Lavalier? Download the <a href="#">Lavalier Server</a> and try out Lavalier for yourself!
              </p>
              <input
                type="text"
                className="my-3 form-control form-control-lg"
                placeholder="https://watch.lavalier.tv"
              />
              <button className="btn btn-lg btn-danger">
                <span className="align-middle">Continue</span>
                <i className="icon-arrow-right-circle icons align-middle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerLogin
