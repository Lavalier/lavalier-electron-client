import './scss/_theme.scss'

function App() {
  return (
    <div className="App">
      <div class="container-fluid d-flex align-items-center min-vh-100">
        <div className="special-gradient special-gradient-one"></div>
        <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
          <div className="d-grid">
            <h1 className="display-logo text-center pb-5">Lavalier</h1>
            <p className="text-center">
              Welcome to Lavalier! Enter a server address to access your Lavalier content.
              <br />
              New to Lavalier? Download the <a href="#">Lavalier Server</a> and try out Lavalier for yourself!
            </p>
            <input type="text" className="my-3 form-control form-control-lg" placeholder="https://watch.lavalier.tv" />
            <button className="btn btn-lg btn-danger">
              <span className="align-middle">Continue</span>
              <i className="icon-arrow-right-circle icons align-middle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
