import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment, List, ListItem, ListItemButton, ListItemText, Paper, ClickAwayListener } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Sidebar from './components/navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pizza from './pages/Pizza';
import Beverages from './pages/Beverages';
import Drinks from './pages/Drinks';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import cart from './assets/cards/cards';
import { Link } from 'react-router-dom';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = cart.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '' && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
              <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, transition: 'margin-left 0.3s ease', marginLeft: sidebarOpen ? 240 : 0, backgroundColor: 'red' }}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleSidebarToggle}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap component="div" sx={{ color: 'white', flexGrow: 1 }}>
                    Pizzarria
                  </Typography>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ position: 'relative', flexGrow: 0 }}>
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'white',
                            },
                            '&:hover fieldset': {
                              borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'white',
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                        }}
                      />
                      {showResults && searchResults.length > 0 && (
                        <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1300, maxHeight: 300, overflowY: 'auto' }}>
                          <List>
                            {searchResults.map((item) => (
                              <ListItem key={item.id} disablePadding>
                                <ListItemButton component={Link} to={`/product/${item.id}`} onClick={handleResultClick}>
                                  <ListItemText primary={item.title} secondary={item.description} />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      )}
                    </Box>
                  </ClickAwayListener>
                </Toolbar>
              </AppBar>
              <Sidebar open={sidebarOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, transition: 'margin-left 0.3s ease', marginLeft: sidebarOpen ? 240 : 0, width: sidebarOpen ? `calc(100% - ${240}px)` : '100%' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/pizza" element={<Pizza />} />
                  <Route path="/beverages" element={<Beverages />} />
                  <Route path="/drinks" element={<Drinks />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/myorders" element={<MyOrders />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
