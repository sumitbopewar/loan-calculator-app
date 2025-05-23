import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const drawerWidth = 240;
const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'EXCHANGE RATES (LIVE)', path: '/rates' },
  { label: 'ABOUT', path: '/about' },
  { label: 'ERROR PAGE', path: '/*' },
];

let colors = []
function Header(props) {
  // console.log();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ display: "none" }}>
        Loan Calculator
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              // selected={location.pathname === item.path}
              sx={{
                textAlign: 'center', marginLeft: 2,
                backgroundColor: location.pathname === item.path ? 'primary.main' : 'light',
                color: location.pathname === item.path ? '#fff' : 'text.primary',
                borderRadius: "5px 0px 0px 5px",
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? 'primary.main' : 'action.hover',
                },
              }}
            // border-radius: 5px 0px 0px 5px;
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            LOAN CALC (+)
          </Typography>
          <Box sx={{
            display: { xs: 'none', sm: 'flex' },
            gap: {
              xs: 0,   // no gap for extra small
              sm: 0,   // no gap for small
              md: 0,   // no gap for medium
              lg: '30px', // gap for large screens
              xl: '30px', // gap for extra-large screens
            },
          }}>
            {navItems.map((item) => (
              <>
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path} sx={{ color: '#fff' }}>
                  {item.label}
                </Button>
              </>
            ))}
          </Box>
          <Switch {...label} value={props.check} onChange={props.change} defaultChecked color='default' />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
