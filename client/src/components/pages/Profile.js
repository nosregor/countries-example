import React, { Component } from 'react';
import api from '../../api'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      file: null
    }
  }
  handleChange(e) {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    console.log('handle submit')
    e.preventDefault()
    api.addPicture(this.state.file)
      .then(data => {
        this.setState({
          user: { ...this.state.user, pictureUrl: data.pictureUrl }
        })
      })
  }
  render() {
    console.log(this.state.user && this.state.user.pictureUrl);

    return (
      <div className="Profile">
        <h2>Profile</h2>

        {/* {JSON.stringify(this.state)} */}

        {this.state.user && <img src={this.state.user.pictureUrl} />}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="file" onChange={(e) => this.handleChange(e)} /> <br />
          <button type="submit">Save new profile picture</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({ user })
      })
  }
}

export default Profile;
