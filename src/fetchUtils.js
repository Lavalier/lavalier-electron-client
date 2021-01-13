function ensureHeaders(options) {
  if (!options) {
    options = {}
  }

  if (!options.headers) {
    options.headers = {}
  }

  options.headers['Accept'] = 'application/json'
}

function returnJSONBody(response) {
  if (response.body) {
    return response.json()
  } else {
    return {}
  }
}

/**
 * Fetches a JSON object using the fetch API.
 * @param {String} url
 * @param {JSON} options Fetch Options
 * @returns {JSON} response
 */
export async function fetchJSON(url, options) {
  ensureHeaders(options)

  const response = await fetch(url, options)

  return returnJSONBody(response)
}

/**
 * Pushes a JSON object using the fetch API and returns a JSON response.
 * @param {String} url
 * @param {JSON} json
 * @param {JSON} options Fetch Options
 * @returns {JSON} response
 */
export async function pushJSON(url, json, options) {
  ensureHeaders(options)

  options.headers['Content-Type'] = 'application/json' // PSA: Do NOT use no-cors on fetch because this header will be reset to text/plain :)
  options.body = JSON.stringify(json)

  const response = await fetch(url, options)

  return returnJSONBody(response)
}
