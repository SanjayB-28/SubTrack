import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PlaidLinkComponent from './components/PlaidLink';
import Transactions from './components/Transactions';
import SubscriptionList from './components/SubscriptionList';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBankConnected, setIsBankConnected] = useState(false);

  // Persist session on page refresh
  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userId");
    const savedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const savedIsBankConnected = sessionStorage.getItem("isBankConnected");

    if (savedUserId && savedIsLoggedIn) {
      setUserId(savedUserId);
      setIsLoggedIn(savedIsLoggedIn === "true");
      setIsBankConnected(savedIsBankConnected === "true");
    }
  }, []);

  // Update session storage whenever state changes
  useEffect(() => {
    sessionStorage.setItem("userId", userId || "");
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
    sessionStorage.setItem("isBankConnected", isBankConnected);
  }, [userId, isLoggedIn, isBankConnected]);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        isBankConnected={isBankConnected}
        setIsLoggedIn={setIsLoggedIn}
        setUserId={setUserId}
        setIsBankConnected={setIsBankConnected}
      />
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/plaid-link" />
            )
          }
        />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
        {/* Plaid Link Route */}
        <Route
          path="/plaid-link"
          element={
            isLoggedIn ? (
              <PlaidLinkComponent
                userId={userId}
                onAccessTokenRetrieved={setAccessToken}
                setIsBankConnected={setIsBankConnected}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Transactions Route */}
        <Route
          path="/transactions"
          element={
            isBankConnected ? (
              <Transactions userId={userId} accessToken={accessToken} />
            ) : (
              <Navigate to="/plaid-link" />
            )
          }
        />
        {/* Subscriptions Route */}
        <Route
          path="/subscriptions"
          element={
            isBankConnected ? (
              <SubscriptionList userId={userId} />
            ) : (
              <Navigate to="/plaid-link" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;