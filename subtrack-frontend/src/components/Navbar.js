import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const Navbar = ({ isLoggedIn, isBankConnected, setIsLoggedIn, setUserId, setIsBankConnected }) => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setIsBankConnected(false);
    sessionStorage.clear(); // Clear session storage on logout
    setOpenLogoutModal(false); // Close the modal after logout
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1A202C",
          padding: "10px 20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#E2E8F0",
            margin: 0,
          }}
        >
          SubTrack
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px", // Space between items
          }}
        >
          {!isLoggedIn && (
            <>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#63B3ED",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#63B3ED",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Register
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link
                to="/plaid-link"
                style={{
                  textDecoration: "none",
                  color: "#63B3ED",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Connect Bank
              </Link>
              {isBankConnected && (
                <>
                  <Link
                    to="/transactions"
                    style={{
                      textDecoration: "none",
                      color: "#63B3ED",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Transactions
                  </Link>
                  <Link
                    to="/subscriptions"
                    style={{
                      textDecoration: "none",
                      color: "#63B3ED",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Subscriptions
                  </Link>
                </>
              )}
              <Button
                onClick={() => setOpenLogoutModal(true)}
                variant="contained"
                sx={{
                  padding: "5px 10px",
                  background: "linear-gradient(90deg, #4299E1, #63B3ED)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "linear-gradient(90deg, #3182CE, #4299E1)",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        PaperProps={{
          style: {
            background: "rgb(45, 55, 72)",
            color: "#E2E8F0",
            borderRadius: "12px",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <DialogTitle>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#E2E8F0",
              textAlign: "center",
            }}
          >
            Confirm Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#A0AEC0",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Are you sure you want to log out? You will need to log in again to access your account.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "15px",
          }}
        >
          <Button
            onClick={() => setOpenLogoutModal(false)}
            sx={{
              background: "#2D3748",
              color: "#E2E8F0",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "14px",
              "&:hover": {
                background: "#4A5568",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            sx={{
              background: "linear-gradient(90deg, #4299E1, #63B3ED)",
              color: "#E2E8F0",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "10px",
              "&:hover": {
                background: "linear-gradient(90deg, #3182CE, #4299E1)",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;