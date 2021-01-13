import { useHistory } from 'react-router-dom'
import { useState } from 'react'

import LogoText from '../common/LogoText'

function Welcome() {
  const [address, setAddress] = useState('')
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (address.length > 0) {
      history.push('/login', {
        address: address
      })
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <p className="text-center">
            Welcome to Lavalier! Enter a server address in the field below to access Lavalier content.
            <br />
            New to Lavalier? Download the <a href="#">Lavalier Server</a> and try out Lavalier for yourself!
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="my-3 form-control form-control-lg"
              placeholder="https://watch.lavalier.tv"
              onChange={(e) => {
                setAddress(e.target.value)
              }}
              required
            />
            <div className="d-grid">
              <button type="submit" className="btn btn-lg btn-danger">
                <span className="align-middle">Continue</span>
                <i className="icon-arrow-right-circle icons left align-middle"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Welcome
