import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load cart from localStorage first, then fallback to backend
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      fetch('/backend/cart.json')
        .then(res => res.json())
        .then(data => {
          setCart(data);
          localStorage.setItem('cart', JSON.stringify(data));
        })
        .catch(err => console.error('Error loading cart:', err));
    }
  }, []);

  const addToCart = (productId, quantity = 1, deliveryOptionId = '1') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { productId, quantity, deliveryOptionId }];
      }
    });
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const updateDeliveryOption = (productId, deliveryOptionId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, deliveryOptionId }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    // Calculate total
    const products = await fetch('/backend/products.json').then(res => res.json());
    const deliveryOptions = await fetch('/backend/deliveryOptions.json').then(res => res.json());
    const subtotal = cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.priceCents * item.quantity : 0);
    }, 0);
    const shipping = 499; // $4.99
    const tax = Math.round(subtotal * 0.1); // 10%
    const totalCostCents = subtotal + shipping + tax;

    const orderTimeMs = Date.now();

    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      orderTimeMs,
      totalCostCents,
      products: cart.map(item => {
        const deliveryOption = deliveryOptions.find(d => d.id === item.deliveryOptionId);
        const deliveryDays = deliveryOption ? deliveryOption.deliveryDays : 7;
        const estimatedDeliveryTimeMs = orderTimeMs + deliveryDays * 24 * 60 * 60 * 1000;
        return {
          productId: item.productId,
          quantity: item.quantity,
          estimatedDeliveryTimeMs
        };
      })
    };

    // Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    // Add new order
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');
  };

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    if (cart.length > 0) {
      saveCart();
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, updateQuantity, updateDeliveryOption, removeFromCart, placeOrder, searchQuery, setSearchQuery }}>
      {children}
    </CartContext.Provider>
  );
}