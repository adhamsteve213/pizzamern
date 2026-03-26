import React from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'red', textAlign: 'center' }}>
        Contact Us
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
        We'd love to hear from you! Reach out with any questions or feedback.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'red' }}>
                Get In Touch
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">info@pizzarria.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, color: 'red' }} />
                <Typography variant="body1">123 Pizza Street, Flavor Town, FT 12345</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'red' }}>
                Send Us a Message
              </Typography>
              <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: 'red', '&:hover': { backgroundColor: '#cc0000' } }}
                  fullWidth
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
