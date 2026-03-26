import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiUrl } from '../config/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const totalCount = items.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);

  const addItem = (product) => {
    // product expected: { id, title, price, img }
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increase = (productId) => {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrease = (productId) => {
    setItems(prev => {
      const found = prev.find(i => i.id === productId);
      if (!found) return prev;
      if (found.quantity <= 1) return prev.filter(i => i.id !== productId);
      return prev.map(i => i.id === productId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const remove = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  };

  const clearCart = () => setItems([]);

  // Checkout: attempt to send to backend orders endpoint; fall back to local storage orders
  const checkout = async (checkoutData) => {
    // checkoutData: { Firstname, Lastname, Middlename, phone, address, email }
    if (!isAuthenticated || !user) throw new Error('Not authenticated');

    const payload = {
      user: user.id || null,
      items: items.map(it => ({ product: it.id || null, quantity: it.quantity, title: it.title, price: it.price })),
      address: checkoutData.address,
      Firstname: checkoutData.Firstname,
      Lastname: checkoutData.Lastname,
      email: checkoutData.email,
      phone: checkoutData.phone,
      totalPrice: totalPrice,
    };

    try {
      const res = await fetch(apiUrl('/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Order failed');
      }
      const data = await res.json();
      // clear cart on success
      clearCart();
      return { success: true, data };
    } catch (err) {
      // fallback: save order locally
      const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
      const order = { id: Date.now(), items, ...payload, createdAt: new Date().toISOString() };
      localStorage.setItem('localOrders', JSON.stringify([order, ...localOrders]));
      clearCart();
      return { success: false, data: order, error: err.message };
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, increase, decrease, remove, clearCart, totalCount, totalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
