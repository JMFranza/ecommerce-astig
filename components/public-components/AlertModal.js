import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import MoreIcon from "@mui/icons-material/MoreVert";
import HelpIcon from "@mui/icons-material/Help";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
// web.cjs is required for IE11 support

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const AlertModal = ({
  open,
  setOpen,
  title,
  message,
  cancel_button,
  cancel_activate,
  cancel_hide_modal = false,
  cancel_disable = false,
  ok_button,
  ok_activate,
  ok_hide_model = false,
  ok_disable = false,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cancel_click = () => {
    if (!cancel_activate) {
      handleClose();
    } else {
      cancel_activate();
      if (cancel_hide_modal) {
        handleClose();
      }
    }
  };
  const ok_click = () => {
    if (!ok_activate) {
      handleClose();
    } else {
      ok_activate();
      if (ok_hide_model) {
        handleClose();
      }
    }
  };
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge>
                  <MailIcon />
                </Badge>
              </IconButton>
              <div className="flex flex-col ml-3">
                <div className="font-medium leading-none">{title}</div>
                <p className="text-sm text-gray-600 leading-none mt-1">
                  {message}
                </p>
              </div>
            </div>
          </div>

          <Toolbar sx={{ mr: 1 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={ok_click}
              disabled={ok_disable}
            >
              {ok_button}
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              color="error"
              onClick={cancel_click}
              disabled={cancel_disable}
            >
              {cancel_button}
            </Button>
          </Toolbar>
        </Box>
      </Modal>
    </Box>
  );
};

export default AlertModal;
