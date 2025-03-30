
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './contexts/CartContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
    <Toaster />
  </CartProvider>
);
