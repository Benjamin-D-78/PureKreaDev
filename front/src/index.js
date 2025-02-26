import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Permet de configurer Stripe avec la clé publique.

const PUBLIC_KEY = "pk_test_51Qk5YUH7IcIj3OW7kxVejWYPOJXIlCKlk6zBhff6s0rLojfOnrBFkDT3EHJLpqyvGeivaO4kM2F53noVN8KScmxM00j33zyRwt";
const stripeTest = loadStripe(PUBLIC_KEY);// Ici on initialise Stripe avec notre clé publique


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripeTest}>
        <AuthProvider> {/* Notre contexte fournit maintenant les données aux composants enfants. */}
          <PanierProvider>
            <ScrollToTop />
            <App />
            <ToastContainer />
          </PanierProvider>
        </AuthProvider>
      </Elements>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
