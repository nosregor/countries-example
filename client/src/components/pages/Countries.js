import React, { Component } from 'react';
import api from '../../api';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  handleDelete(idClicked) {
    console.log(idClicked);
    api.deleteCountry(idClicked)
      .then((resp) => {
        console.log('Delete', resp)
        this.setState({
          countries: this.state.countries.filter(c => c._id !== idClicked)
        })
      })
      .catch(err => console.log("Error", err))
  }

  handleEdit(idClicked) {
    // Redirects the user to '/edit-country/'+idClicked
    console.log('COUNTRIES', idClicked);
    this.props.history.push('/edit-country/' + idClicked)
  }

  render() {
    console.log(api.isLoggedIn());

    return (

      <div className="Countries" >
        <h2>List of countries</h2>

        <table>
          <thead>
            <th>Name</th>
            <th>Capital</th>
            <th>Area</th>
            <th>Description</th>
            <th>Owner</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </thead>
          <tbody>

            {this.state.countries.map(c =>

              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.capitals}</td>
                <td>{c.area}</td>
                <td>{c.description}</td>
                <td>{c._owner.username}</td>
                <td>
                  {api.isLoggedIn() && <button onClick={() => this.handleEdit(c._id)}>Edit</button>}
                  {api.isLoggedIn() && <button onClick={() => this.handleDelete(c._id)}>Delete</button>}
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
}

export default Countries;
