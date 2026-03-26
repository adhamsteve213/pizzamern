import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import cart from '../assets/cards/cards'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import banner1 from '../assets/banners/banner 1 pizza.webp';
import banner2 from '../assets/banners/Screenshot 2025-10-28 104404.png';
import banner3 from '../assets/banners/Screenshot 2025-10-28 104423.png';
import banner4 from '../assets/banners/Screenshot 2025-10-28 104433.png';
function Home() {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
 
  const bannerImages = [
    banner1,
    banner2,
    banner3,
    banner4
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {bannerImages.map((imgSrc, index) => (
          <div key={index}>
            <img src={imgSrc} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>

      {/* Display slides below the slider */}
      <div className="slides-display">
        <h2>Slides</h2>
        <div className="slides-grid">
          {bannerImages.map((imgSrc, index) => (
            <div className="slide-item" key={index}>
              <img src={imgSrc} alt={`Slide ${index + 1}`} />
            </div>
          ))}
      </div>
      </div>
      {/* Cards for the swiper */}
      <Swiper spaceBetween={20} slidesPerView={3}>
        {cart.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/product/${item.id}`}>
              <div className="card">
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    



      <Grid container spacing={2} sx={{ mt: 4 }}>
        {cart.map((item) => (
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
}
/*******  7c6befd0-fc36-4d40-8cba-817dac1d0f24  *******/

export default Home;
