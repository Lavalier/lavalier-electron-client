import { useHistory } from 'react-router-dom'

import MoviePosterCard from './MoviePosterCard'

function DiscoveryRow(props) {
  const history = useHistory()

  return (
    <div>
      <div className="mt-3" />
      <h4 className="text-white ms-6 mb-4">{props.name}</h4>
      {props.media.map((row) => (
        <div className="row row-cols-auto mw-100 flex-nowrap overflow-x-hidden">
          <div className="col ms-row-fix" />
          {row.map((metadata) => (
            <div className="col">
              <MoviePosterCard
                name={metadata.content_title}
                subtitle={metadata.release_date}
                poster={metadata.poster}
                onClick={async () => {
                  history.push(`/watch/${metadata._id}`)
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DiscoveryRow
