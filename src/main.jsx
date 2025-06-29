
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './contexts/CartContext' 
import { UserProvider } from './contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>
);
