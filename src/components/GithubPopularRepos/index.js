import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageFilterId: languageFiltersData[0].id,
    reposData: [],
    isLoading: true,
    fetchSuccess: true,
  }

  getRepos = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({isLoading: true})
    // const updatedLanguageFilterId =
    //   activeLanguageFilterId === 'ALL' ? '' : activeLanguageFilterId
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(githubReposApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const formattedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
      }))
      //   console.log(formattedData)
      this.setState({
        reposData: formattedData,
        isLoading: false,
        fetchSuccess: true,
      })
    } else {
      this.setState({fetchSuccess: false, isLoading: false})
    }
  }

  onChangeActiveFilter = id => {
    this.setState({activeLanguageFilterId: id}, this.getRepos)
  }

  componentDidMount = () => {
    this.getRepos()
  }

  render() {
    const {reposData, isLoading, fetchSuccess} = this.state
    return (
      <div>
        <h1>Popular</h1>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              onChangeActiveFilter={this.onChangeActiveFilter}
              key={each.id}
              filterItemDetails={each}
            />
          ))}
        </ul>
        {fetchSuccess && (
          <div>
            {isLoading && (
              <div data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#0284c7"
                  height={80}
                  width={80}
                />
              </div>
            )}
            {!isLoading && (
              <ul>
                {reposData.map(each => (
                  <RepositoryItem key={each.id} repoItemDetails={each} />
                ))}
              </ul>
            )}
          </div>
        )}
        {!fetchSuccess && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <p>Something Went Wrong</p>
          </div>
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
