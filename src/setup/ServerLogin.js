import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usePersistedState from '../usePersistedState'
import { fetchJSON, pushJSON } from '../fetchUtils'

import { nanoid } from 'nanoid'

import LogoText from '../common/LogoText'
import ServerName from '../common/ServerName'
import ErrorBox from '../common/ErrorBox'

function ServerLogin(props) {
  let largeIcon

  let address = props.location.state.address
  const history = useHistory()

  // Add HTTP protocol if not present in the address
  if (!address.startsWith('http://') && !address.startsWith('https://')) {
    address = `http://${address}`
  }

  if (address.startsWith('http://localhost') || address.startsWith('http://127.0.0.1')) {
    largeIcon = <i className="icon-home icons huge-icons text-dark"></i>
  } else {
    largeIcon = <i className="icon-cloud-download icons huge-icons text-dark"></i>
  }

  const secure = address.startsWith('https://')

  // Check if server has been setup and enter server setup phase if server is not setup
  useEffect(async () => {
    const setupResponse = await fetchJSON(`${address}/api/setup`)

    if (!setupResponse.setup) {
      history.push('/setup-server', {
        address: address
      })
    }
  }, [])

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [servers, setServers] = usePersistedState('servers', [])

  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (user.length > 0 && password.length > 0) {
      const loginResponse = await pushJSON(
        `${address}/api/login`,
        {
          user: user,
          password: password
        },
        {
          method: 'POST'
        }
      )

      if (loginResponse.error) {
        setError(loginResponse.message)
      } else {
        setServers(
          servers.concat([
            {
              local_server_id: nanoid(),
              server_name: loginResponse.server_name,
              username: loginResponse.username,
              email: loginResponse.email,
              admin: loginResponse.admin,
              token: loginResponse.token
            }
          ])
        )

        history.push('/home')
      }
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="row">
          <div className="col border-end border-2 pe-4 my-auto py-5">
            <ServerName address={address} secure={secure} />
            <p className="text-center">{largeIcon}</p>
            <p className="text-center">
              <a onClick={history.goBack} className="text-muted mt-3 text-decoration-none">
                Switch Server?
              </a>
            </p>
          </div>
          <div className="col ps-5">
            <form onSubmit={handleSubmit}>
              <div className="d-grid">
                <LogoText />
                <ErrorBox message={error} />
                <input
                  type="text"
                  className="my-3 form-control form-control-lg"
                  placeholder="Username or Email Address"
                  onChange={(e) => {
                    setUser(e.target.value)
                  }}
                  required
                />
                <input
                  type="password"
                  className="my-1 form-control form-control-lg"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required
                />
                <button type="submit" className="btn btn-lg btn-danger mt-4">
                  <span className="align-middle">Login</span>
                  <i className="icon-login icons left align-middle"></i>
                </button>
                <a className="text-center text-muted mt-3 text-decoration-none">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerLogin
