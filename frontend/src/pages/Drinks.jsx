import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import drinks from '../assets/cards/drinks';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Drinks = () => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{color: 'red', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}} >Drinks</h1>
      <p style={{color: 'red', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}} >Enjoy our selection of drinks!</p>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {drinks.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/product/${item.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.img}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'red' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'red' }}>
                    ${item.price}
                  </Typography>
                  <Button variant="contained" sx={{ mt: 1, backgroundColor: 'red', color: 'white' }} onClick={() => { if (!isAuthenticated) return navigate('/login'); addItem({ id: item.id, title: item.title, price: item.price, img: item.img }); }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Drinks;
