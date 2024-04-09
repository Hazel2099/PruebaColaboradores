import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function GridCrudComponent() {
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: 'au_Id', headerName: 'Identificación', width: 70, editable: true },
    { field: 'au_fname', headerName: 'Nombre', width: 130, editable: true },
    { field: 'au_lname', headerName: 'Apellido', width: 130, editable: true },
    { field: 'phone', headerName: 'Teléfono', width: 130, editable: true },
    { field: 'address', headerName: 'Dirección', width: 130, editable: true },
    { field: 'city', headerName: 'Ciudad', width: 130, editable: true },
    { field: 'state', headerName: 'Estado', width: 130, editable: true },
    { field: 'zip', headerName: 'Código Postal', width: 130, editable: true },
    { field: 'contract', headerName: 'Contract', width: 130, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleUpdate(params.row)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  React.useEffect(() => {
    axios.get('https://localhost:44354/api/Author')
      .then(response => {
        const data = response.data;
        // Ordena los datos por au_fname y luego por au_lname
        data.sort((a, b) => {
          const nameA = a.au_fname.toLowerCase() + a.au_lname.toLowerCase();
          const nameB = b.au_fname.toLowerCase() + b.au_lname.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setRows(data);
      })
      .catch(error => {
        console.error('Error', error);
      });
  }, []);

  const handleUpdate = (params) => {
    const updatedRows = rows.map((row) => {
      debugger;
      if (row.au_Id === params.au_Id) {
        return params;
      }
      return row;
    });

    axios.put(`https://localhost:44354/api/Author/${params.au_Id}`, params)
      .then(() => {
        alert('Autor actualizado correctamente');
        setRows(updatedRows);
      })
      .catch(error => {
        console.error(error);
        alert('Fallo al actualizar autor');
      });
  };

  const handleDelete = (row) => {
    const deletedRows = rows.filter(r => r.au_Id !== row.au_Id);
    setRows(deletedRows);

    axios.delete(`https://localhost:44354/api/Author/${row.au_Id}`)
      .then(() => {
        alert('Autor eliminado correctamente');
      })
      .catch(error => {
        console.error(error);
        alert('Fallo al eliminar autor');
      });
  };

  

  const newRow = {
    au_Id: '',
    au_fname: '',
    au_lname: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contract: '',
  };


  return (
    <div style={{ height: 600, width: '96%' }}>
     <Box mt={3} ml={7}> 
  <Button variant="contained" color="primary" component={Link} to="/crear">
    Create
  </Button>
</Box>
      
      <Box mt={5} ml={5}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.au_Id}
        onEditCellChangeCommitted={handleUpdate}      
      />
    </Box>
    </div>
  );
}