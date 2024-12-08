import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from '../plaidService';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PlaidLinkComponent = ({ userId, onAccessTokenRetrieved, setIsBankConnected }) => {
  const [linkToken, setLinkToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const token = await createLinkToken(userId);
        setLinkToken(token);
      } catch (error) {
        console.error('Error creating link token:', error.message);
      }
    };
    fetchLinkToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      try {
        const { access_token } = await exchangePublicToken(publicToken);
        onAccessTokenRetrieved(access_token);
        setIsBankConnected(true);
        setIsConnected(true);
      } catch (error) {
        console.error('Error exchanging public token:', error.message);
      }
    },
  });

  return (
    <Card style={{ margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Connect Your Bank</Typography>
        {isConnected ? (
          <Typography variant="body1" color="green">
            You are connected to the bank! Transactions and Subscriptions pages are now available.
          </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => open()}
            disabled={!ready}
          >
            Link Account
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaidLinkComponent;
