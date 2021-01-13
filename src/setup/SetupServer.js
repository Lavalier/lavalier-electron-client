import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { pushJSON } from '../fetchUtils'

import LogoText from '../common/LogoText'
import ErrorBox from '../common/ErrorBox'

function SetupServer(props) {
  const address = props.location.state.address

  const [serverName, setServerName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const [error, setError] = useState('')

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (serverName.length > 0 && adminEmail.length > 0 && adminUsername.length > 0 && adminPassword.length > 0) {
      const setupResponse = await pushJSON(
        `${address}/api/setup`,
        {
          server_name: serverName,
          admin_email: adminEmail,
          admin_username: adminUsername,
          admin_password: adminPassword
        },
        {
          method: 'POST'
        }
      )

      if (setupResponse.error) {
        setError(setupResponse.message)
      } else {
        history.push('/login', {
          address: address
        })
      }
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <p className="text-center">Welcome to Lavalier! Let's setup your server!</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <ErrorBox message={error} />
            <div className="mb-3">
              <label className="fw-bold form-label">Server Name</label>
              <input
                type="text"
                className="mb-3 form-control form-control-lg"
                placeholder="Keanu Reeves Hideout"
                onChange={(e) => {
                  setServerName(e.target.value)
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold form-label">Admin Account Email Address</label>
              <input
                type="email"
                className="mb-3 form-control form-control-lg"
                placeholder="steve@gmail.com"
                onChange={(e) => {
                  setAdminEmail(e.target.value)
                }}
                required
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="fw-bold form-label">Admin Account Username</label>
                  <input
                    type="text"
                    className="mb-3 form-control form-control-lg"
                    placeholder="keanu"
                    onChange={(e) => {
                      setAdminUsername(e.target.value)
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="fw-bold form-label">Admin Account Password</label>
                  <input
                    type="password"
                    className="mb-3 form-control form-control-lg"
                    placeholder="**************"
                    onChange={(e) => {
                      setAdminPassword(e.target.value)
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-lg btn-danger">
                <span className="align-middle">Finish</span>
                <i className="icon-rocket icons left align-middle"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SetupServer
