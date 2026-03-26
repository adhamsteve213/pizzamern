import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'red', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalPizzaIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5" component="div">
                Pizzarria
              </Typography>
            </Box>
            <Typography variant="body2">
              Serving delicious pizzas made with the finest ingredients since 2010. Experience the taste of authentic Italian cuisine with a modern twist.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Link>
              <Link href="/pizza" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Pizza
              </Link>
              <Link href="/beverages" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Beverages
              </Link>
              <Link href="/contact" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Contact
              </Link>
              <Link href="/about" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                About
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Stay connected for the latest updates, special offers, and mouth-watering pizza recipes!
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.2)', mt: 4, pt: 2 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Pizzarria. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
