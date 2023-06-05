import './index.css'

const PasswordListItem = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {username, password, id, website} = passwordDetails
  const firstLetter = website ? website[0].toUpperCase() : ''

  const removePassword = () => {
    deletePassword(id)
  }

  const renderPassword = () => {
    if (showPassword) {
      return <p>{password}</p>
    }
    return (
      <img
        className="stars"
        alt="stars"
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      />
    )
  }
  return (
    <li>
      <div className="password-list-item">
        <div className="profile">
          <p className="name">{firstLetter}</p>
        </div>
        <div>
          <p>{website}</p>
          <p>{username}</p>
          {renderPassword()}
        </div>
        <button
          data-testid="delete"
          onClick={removePassword}
          className="dlt-button"
          type="button"
        >
          <img
            className="dlt-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default PasswordListItem
