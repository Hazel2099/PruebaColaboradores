import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CrearComponent from './CrearComponent ';
import GridCrudComponent from './GridCrudComponent';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Gestión de autores', path: '/grid' },
];

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {pages.map((page, index) => (
        <ListItem button key={index} component={Link} to={page.path}>
          <ListItemText primary={page.name} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gestión de Autores
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
        <Routes>
        <Route path="/" element={<h1 style={{ textAlign: 'center' }}>Bienvenido a la página de Inicio</h1>} />
          <Route path="/grid" element={<GridCrudComponent />} />
          <Route path="/crear" element={<CrearComponent />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;