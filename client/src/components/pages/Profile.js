import React, { Component } from 'react';
import api from '../../api'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: null,
      username: null,
      currentPassword: null,
      newPassword: null,
      pictureUrl: null,
      message: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  // handleChange(e) {
  //   console.log('handleChange');
  //   console.log('DEBUG e.target.files[0]', e.target.files[0]);
  //   this.setState({
  //     file: e.target.files[0]
  //   })
  // }

  handleSubmit(e) {
    console.log('handle submit')
    e.preventDefault()

    // new code
    let body = {
      username: this.state.username,
      pictureUrl: this.state.pictureUrl
    }

    if (this.state.newPassword && this.state.newPassword.length > 0) {
      body.currentPassword = this.state.currentPassword
      body.newPassword = this.state.newPassword
    }

    api.editProfile(body)
      .then(data => {
        this.setState({
          message: "Your profile was updated"
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000);
      })
    // .then()
    // api.addPicture(this.state.file)
    //   .then(data => {
    //     this.setState({
    //       user: { ...this.state.user, pictureUrl: data.pictureUrl }
    //     })
    //   })
  }

  handleFileChange = e => {
    this.setState({
      pictureUrl: null
    })

    const file = e.target.files[0]

    api.addPicture(file)
      .then(data => {
        this.setState({
          pictureUrl: data.pictureUrl
        })
      })
  }


  render() {
    // console.log('RENDER', this.state.user && this.state.user.pictureUrl);
    console.log('RENDER', this.state.username);

    if (!this.state.username) {
      return <div><h2>Profile</h2><p>Loading...</p></div>
    }

    return (
      <div className="Profile">
        <h2>Profile</h2>

        {/* {JSON.stringify(this.state)} */}

        {/* {this.state.user && <img src={this.state.user.pictureUrl} />} */}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <br />
          Current Password:
          <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange} />
          <br />
          New Password:
          <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
          <br />
          <input type="file" onChange={this.handleFileChange} /> <br />
          {this.state.pictureUrl && <img src={this.state.pictureUrl} style={{ height: 200 }} />}
          <br />
          <button type="submit">Save profile</button>

          {/* <input type="file" onChange={(e) => this.handleChange(e)} /> <br /> */}
        </form>


        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}

      </div>
    );
  }

  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({
          username: user.username,
          pictureUrl: user.pictureUrl
        })
      })
  }
}

export default Profile;
