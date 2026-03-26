import React from 'react';
import { Container, Typography, Grid, Card, CardContent,  Box } from '@mui/material';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'red', textAlign: 'center' }}>
        About Pizzarria
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
        Discover the story behind our delicious pizzas and our passion for great food.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'red' }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2010, Pizzarria started as a small family-owned pizzeria with a simple mission: to serve the best pizza in town using only the freshest ingredients and traditional recipes passed down through generations.
              </Typography>
              <Typography variant="body1" paragraph>
                Over the years, we've grown from a single location to multiple outlets across the city, but our commitment to quality and customer satisfaction remains unchanged. Every pizza is crafted with care, using premium ingredients and baked to perfection in our stone ovens.
              </Typography>
              <Typography variant="body1">
                At Pizzarria, we believe that great food brings people together. Whether you're celebrating a special occasion or just craving a delicious meal, we're here to make every bite memorable.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'red' }}>
                What Makes Us Special
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalPizzaIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">Hand-tossed dough made fresh daily</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RestaurantIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">Authentic Italian recipes with a modern twist</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">Dedicated team of pizza artisans</Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                We use only the finest ingredients, including vine-ripened tomatoes, fresh mozzarella, and premium meats. Our commitment to quality ensures that every pizza delivers an exceptional dining experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'red' }}>
          Visit Us Today!
        </Typography>
        <Typography variant="body1">
          Come experience the Pizzarria difference. Whether dining in, taking out, or ordering delivery, we're ready to serve you the best pizza around.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
