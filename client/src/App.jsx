import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="bottom-right" />
    </AuthProvider>
  );
}

export default App;
