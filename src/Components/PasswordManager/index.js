import './index.css'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import PasswordListItem from '../PasswordListItem'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    showPassword: false,
    searchInput: '',
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  getFilteredList = () => {
    const {passwordsList, searchInput} = this.state

    return passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  addPassword = event => {
    console.log('yes')
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      password: '',
      username: '',
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {showPassword} = this.state
    const filteredList = this.getFilteredList()

    if (filteredList.length === 0) {
      return (
        <div>
          <img
            className="no-passwords-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p>No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="password-list">
        {filteredList.map(each => (
          <PasswordListItem
            deletePassword={this.deletePassword}
            passwordDetails={each}
            showPassword={showPassword}
            key={each.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {website, username, password, searchInput} = this.state
    const count = this.getFilteredList().length
    return (
      <div className="app-container">
        <img
          className="app-logo"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="container1">
          <form className="new-password-input-container">
            <h1 className="new-password-heading">Add New Password</h1>
            <div className="input-container">
              <img
                className="input-logo"
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
              />
              <hr className="vertical-line" />
              <input
                value={website}
                onChange={this.onChangeWebsite}
                className="input"
                placeholder="Enter Website"
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                className="input-logo"
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <hr className="vertical-line" />
              <input
                value={username}
                onChange={this.onChangeUsername}
                className="input"
                placeholder="Enter Username"
                type="text"
              />
            </div>
            <div className="input-container">
              <img
                className="input-logo"
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
              />
              <hr className="vertical-line" />
              <input
                value={password}
                onChange={this.onChangePassword}
                className="input"
                placeholder="Enter Password"
                type="password"
              />
            </div>
            <button
              onClick={this.addPassword}
              className="add-button"
              type="submit"
            >
              Add
            </button>
          </form>
          <div className="new-password-logo-container">
            <img
              className="sm-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <img
              className="lg-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>
        </div>
        <div className="container2">
          <div className="head-container">
            <h1 className="your-password-heading">
              Your Passwords <p>{count}</p>
            </h1>
            <div className="input-container">
              <img
                className="input-logo"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
              />
              <hr className="vertical-line" />
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="input"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
          <hr />
          <input
            id="checkbox"
            onChange={this.onChangeCheckBox}
            type="checkbox"
          />
          <label htmlFor="checkbox">Show Passwords</label>
          {this.renderPassword()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
