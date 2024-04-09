import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, FormControlLabel, Grid } from '@mui/material';
import { Box } from '@mui/material';
import { withRouter } from 'react-router-dom';

class CrearComponent extends Component {
  state = {
    au_Id: '',
    au_lname: '',
    au_fname: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contract: false
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  createAuthor = (event) => {
    event.preventDefault();
    const { au_Id, au_lname, au_fname, phone, address, city, state, zip, contract } = this.state;
    const newData = { au_Id, au_lname, au_fname, phone, address, city, state, zip, contract };

    axios.post('https://localhost:44354/api/Author', newData)
      .then(() => {
        alert('Autor creado correctamente');
        this.props.history.push('/grid');
      })
      .catch(error => {
        alert('Fallo al crear el autor');
      });
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Crear Autor</h1>
        <Box mt={5}> 
        <form onSubmit={this.createAuthor}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Identificación"
                name="au_Id"
                value={this.state.au_Id}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="au_fname"
                value={this.state.au_fname}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="au_lname"
                value={this.state.au_lname}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado"
                name="state"
                value={this.state.state}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Código Postal"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="contract"
                    checked={this.state.contract}
                    onChange={this.handleInputChange}
                  />
                }
                label="Contract"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
        </Box>
      </div>
    );
  }
}hhhjj
jjj
export default CrearComponent;