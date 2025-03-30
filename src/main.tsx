
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './contexts/CartContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <CartProvider>
      <App />
      <Toaster />
    </CartProvider>
  </UserProvider>
);
