import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { items, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Wishlist</h2>
        <p>Please <a href="/login">login</a> to use the wishlist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Wishlist</h1>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {items.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: 12 }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
              <h3>{item.title}</h3>
              <p>${item.price?.toFixed?.(2) ?? item.price}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => moveToCart(item.id)}>Move to cart</button>
                <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && <div style={{ marginTop: 16 }}><button onClick={() => clearWishlist()}>Clear wishlist</button></div>}
    </div>
  );
};

export default Wishlist;
