import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { apiUrl } from '../config/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('wishlist');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = async (product) => {
    // product: { id, title, price, img }
    setItems(prev => {
      if (prev.find(i => i.id === product.id)) return prev;
      return [...prev, { ...product }];
    });

    // attempt to persist to backend if authenticated
    if (!isAuthenticated || !user) return;
    try {
      await fetch(apiUrl('/wishlist'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId: product.id, userId: user.id }),
      });
    } catch (err) {
      // ignore network errors; we have local storage fallback
      console.debug('Wishlist: backend save failed', err.message || err);
    }
  };

  const removeFromWishlist = async (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));

    if (!isAuthenticated || !user) return;
    try {
      await fetch(apiUrl(`/wishlist/${productId}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
    } catch (err) {
      console.debug('Wishlist: backend delete failed', err.message || err);
    }
  };

  const moveToCart = (productId) => {
    const found = items.find(i => i.id === productId);
    if (!found) return;
    addItem(found);
    removeFromWishlist(productId);
  };

  const clearWishlist = () => setItems([]);

  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, moveToCart, clearWishlist, count }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
