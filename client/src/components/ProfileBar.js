import React, { Component } from 'react'

const initLinks = require('.././initLinks')

class ProfileBar extends Component {
  render() {
    return (
      <div className="profile-btn-pos">
        <a href={initLinks.profile}>
          <button className="home-button">
            <img className="home-img" alt='' src="icons/profile.png"></img>
          </button>
        </a>
      </div>
    )
  }
}

export default ProfileBar
