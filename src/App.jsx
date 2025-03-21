import React, { useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: 125.00,
    originalPrice: 250.00,
    image: "https://www.filippo.pl/data/include/cms//jes-zim1.jpg"
  },
  {
    id: 2,
    name: "Summer Edition Sneakers",
    description: "Lightweight and breathable sneakers perfect for summer.",
    price: 99.99,
    originalPrice: 150.00,
    image: "https://assets.teenvogue.com/photos/664f45bacacb74e472b645c4/master/w_2560%2Cc_limit/GettyImages-2151594268.jpg"
  },
  {
    id: 3,
    name: "Winter Boots",
    description: "Warm and waterproof boots for the coldest days.",
    price: 199.99,
    originalPrice: 300.00,
    image: "https://www.switchbacktravel.com/sites/default/files/articles%20/UGG%20Adirondack%20III%20women%27s%20winter%20boot%20%28walking%20near%20water%20m%29.jpg"
  },
  {
    id: 4,
    name: "Spring Running Shoes",
    description: "Comfortable and flexible running shoes for spring.",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://runningmagazine.ca/wp-content/uploads/2018/07/Enko-19.jpg"
  },
  {
    id: 5,
    name: "Classic Leather Sneakers",
    description: "Timeless leather sneakers for any occasion.",
    price: 149.99,
    originalPrice: 200.00,
    image: "https://cdn.shopify.com/s/files/1/0064/0116/3316/files/windsford-02_1d859d0c-43bc-4996-9805-2d7c07577c6e.jpg?v=1606994379"
  },
  {
    id: 6,
    name: "High-Top Basketball Shoes",
    description: "Durable and supportive shoes for the court.",
    price: 129.99,
    originalPrice: 180.00,
    image: "https://i.pinimg.com/736x/36/66/08/366608cb050436edc2b3e0f05b40d8be.jpg"
  }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="App">
      <header>
        <h1>SNEAKER COMPANY</h1>
        <div className="cart-section">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <p>Total: ${totalPrice.toFixed(2)}</p>
            </>
          )}
        </div>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)} <span className="original-price">${product.originalPrice.toFixed(2)}</span></p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;