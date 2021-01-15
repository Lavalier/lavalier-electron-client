import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import usePersistedState from '../usePersistedState'
import { pushJSON } from '../fetchUtils'

import LogoText from '../common/LogoText'
import ErrorBox from '../common/ErrorBox'

function ManageProfile(props) {
  const [name, setName] = useState('')

  const [currentServer] = usePersistedState('currentServer', {})
  const history = useHistory()

  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (name.length > 0) {
      const profileModifyResponse = await pushJSON(
        `${currentServer.address}/api/profiles`,
        {
          id: props.location.state.profile,
          name: name
        },
        {
          headers: { 'lavalier-token': currentServer.token },
          method: 'PATCH'
        }
      )

      if (profileModifyResponse.error) {
        setError(profileModifyResponse.message)
      } else {
        history.goBack()
      }
    }
  }

  async function deleteProfile() {
    const deleteProfileResponse = await pushJSON(
      `${currentServer.address}/api/profiles`,
      {
        id: props.location.state.profile
      },
      {
        headers: { 'lavalier-token': currentServer.token },
        method: 'DELETE'
      }
    )

    if (deleteProfileResponse.error) {
      setError(deleteProfileResponse.message)
    } else {
      history.goBack()
    }
  }

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="special-gradient special-gradient-one"></div>
      <div className="container special-gradient-content bg-white mw-50 rounded shadow-thick p-5">
        <div className="d-grid">
          <LogoText />
          <h2 className="text-center mb-4">Modify Profile</h2>
          <ErrorBox message={error} />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-bold form-label">Profile Name</label>
              <input
                type="text"
                className="mb-3 form-control form-control-lg"
                placeholder="Keanu"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
              />
            </div>
            <button type="button" onClick={deleteProfile} className="btn btn-lg btn-danger mb-3">
              <span className="align-middle">Delete Profile</span>
              <i className="icon-trash icons left align-middle"></i>
            </button>
            <div className="row">
              <div className="col d-grid">
                <button type="button" onClick={history.goBack} className="btn btn-lg btn-primary">
                  <i className="icon-arrow-left-circle icons right align-middle"></i>
                  <span className="align-middle">Back</span>
                </button>
              </div>
              <div className="col d-grid">
                <button type="submit" className="btn btn-lg btn-danger">
                  <span className="align-middle">Save</span>
                  <i className="icon-arrow-right-circle icons left align-middle"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ManageProfile
