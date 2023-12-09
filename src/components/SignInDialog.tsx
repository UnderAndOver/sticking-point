import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaDiscord, FaReddit, FaTwitter } from "react-icons/fa";
import { Provider } from "next-auth/providers/index";
import { FcGoogle } from "react-icons/fc";
import {
  DialogActions,
  DialogContent,
  IconButton,
  ListItemButton,
  Typography,
} from "@mui/material";
import { IoIosCloseCircle } from "react-icons/io";
interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SignInDialog({ open, onClose }: SignInDialogProps) {
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  useEffect(() => {
    const getProviders = async () => {
      const response = await fetch("/api/auth/providers");
      const providers = await response.json();
      setProviders(providers);
    };
    getProviders();
  }, []);

  const handleSignIn = (providerId: string) => () => {
    signIn(providerId, { redirect: false });
  };
  const iconColors: Record<string, string> = {
    Google: "#525252",
    Discord: "#7289da",
    Twitter: "#1da1f2",
    Reddit: "#ff5700",
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        sx={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          "& .MuiPaper-root": {
            borderRadius: 2,
            width: 800,
          },
          "& .MuiDialogContent-root": {
            padding: "1rem 1rem 1rem 1rem",
          },
        }}
      >
        <DialogTitle>Sign In with:</DialogTitle>
        <DialogActions
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
          }}
        >
          <IconButton
            onClick={onClose}
            size="large"
            sx={{
              color: "#ce6238",
            }}
          >
            <IoIosCloseCircle />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <List>
            {Object.values(providers).map((provider) => (
              <ListItemButton
                onClick={handleSignIn(provider.id)}
                key={provider.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: 25,
                  backgroundColor: iconColors[provider.name],
                  borderColor: iconColors[provider.name],
                  color: "#fff",
                  fontSize: 16,
                  marginBottom: 1.5,
                  "&:hover": {
                    backgroundColor: iconColors[provider.name],
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 24,
                  }}
                >
                  {provider.name === "Google" && <FcGoogle />}
                  {provider.name === "Twitter" && <FaTwitter />}
                  {provider.name === "Reddit" && <FaReddit />}
                  {provider.name === "Discord" && <FaDiscord />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    flexGrow: 0,
                  }}
                  primary={
                    <Typography fontWeight="bold">{`${provider.name}`}</Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
