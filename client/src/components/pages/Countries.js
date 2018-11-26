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
          // this 
          countries: this.state.countries.filter(c => c._id !== idClicked)
        })
      })
      .catch(err => console.log("Error", err))
  }

  render() {
    return (

      <div className="Countries" >
        <h2>List of countries</h2>

        <table>
          <thead>
            <th>Name</th>
            <th>Capital</th>
            <th>Area</th>
            <th>Description</th>
            <th>ACTION1</th>
            <th>ACTION2</th>
          </thead>
          <tbody>

            {this.state.countries.map(c =>
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.capitals}</td>
                <td>{c.area}</td>
                <td>{c.description}</td>
                <td><button onClick={(e) => this.handleClickEdit(e)}>Edit</button></td>
                <td><button onClick={(e) => this.handleDelete(c._id)}>Delete</button></td>
              </tr>
            )}

          </tbody>
        </table>



        {/* {this.state.countries.map(c => <li key={c._id}>{c.name}</li>)} */}
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
