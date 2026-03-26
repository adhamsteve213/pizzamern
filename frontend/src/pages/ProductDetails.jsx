import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './ProductDetails.css';
import cart from '../assets/cards/cards';
import side from '../assets/cards/side';
import drinks from '../assets/cards/drinks';
import pizza from '../assets/cards/pizza';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
// Using static data for now

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const allProducts = [...cart, ...side, ...drinks, ...pizza];
  const product = allProducts.find(p => p.id === parseInt(id));
  const { items: wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [isFavorite, setIsFavorite] = useState(() => !!wishlistItems.find(i => i.id === parseInt(id)));

  const handleAddToCart = (productId) => {
    if (!isAuthenticated) return navigate('/login');
    const prod = { id: product.id, title: product.title, price: product.price, img: product.img };
    addItem(prod);
    console.log(`Product ${productId} added to cart`);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return navigate('/login');
    const willBeFav = !isFavorite;
    setIsFavorite(willBeFav);
    const prod = { id: product.id, title: product.title, price: product.price, img: product.img };
    if (willBeFav) {
      addToWishlist(prod);
    } else {
      removeFromWishlist(product.id);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="product-image-container">
          <img src={product.img} alt={product.title} className="product-image" />
        </div>
        <div className="product-info-container">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <FaHeart
              className={`favorite-icon ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            />
          </div>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;