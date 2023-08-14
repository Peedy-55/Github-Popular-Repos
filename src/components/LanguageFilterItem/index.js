const LanguageFilterItem = props => {
  const {filterItemDetails, onChangeActiveFilter} = props
  const {id, language} = filterItemDetails

  const onClickLanguageItem = () => {
    onChangeActiveFilter(id)
  }

  return (
    <li>
      <button type="button" onClick={onClickLanguageItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
