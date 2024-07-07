import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Historial from './components/Historial';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isLoggedIn = () => !!localStorage.getItem('token');

  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
         <Route path="/historial" element={<Historial />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
