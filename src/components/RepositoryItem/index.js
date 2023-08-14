const RepositoryItem = props => {
  const {repoItemDetails} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = repoItemDetails

  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <p>{name}</p>
      <div className="hor-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="hor-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="hor-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
