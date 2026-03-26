import * as React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const drawerWidth = 240;

export default function Sidebar({ open }) {
  const { isAuthenticated, logout } = useAuth();
  const { totalCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Pizza', icon: <LocalPizzaIcon />, path: '/pizza' },
    { text: 'Beverages', icon: <LocalDrinkIcon />, path: '/beverages' },
    { text: 'Drinks', icon: <LocalBarIcon />, path: '/drinks' },
  { text: `Cart ${totalCount ? `(${totalCount})` : ''}`, icon: <ShoppingCartIcon />, path: '/cart' },
    { text: 'My Orders', icon: <ReceiptIcon />, path: '/myorders' },
    { text: `Wishlist ${wishlistCount ? `(${wishlistCount})` : ''}`, icon: <FavoriteIcon />, path: '/wishlist' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
  ];

  const authItems = isAuthenticated
    ? [{ text: 'Logout', icon: <LogoutIcon />, action: logout }]
    : [
        { text: 'Login', icon: <LoginIcon />, path: '/login' },
        { text: 'Signup', icon: <PersonAddIcon />, path: '/signup' },
      ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'red',
          borderRight: '1px solid #ddd',
          paddingTop: '64px',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {authItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.path ? Link : 'button'}
              to={item.path}
              onClick={item.action}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
