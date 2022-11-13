import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import UpdateUserDialog from "./UpdateUserDialog";

function ListItemUser({
  image,
  primaryText,
  secondaryText,
  users,
  setUsers,
  userId,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (e) => {
    axios
      .delete(
        `https://gorest.co.in/public/v2/users/${userId}?access-token=cc35c3d0973112840479414ba7dea488b2a640d1321dcb1d33d04e823ef58909`
      )
      .then((res) => {
        console.log(res);
        window.alert("Sukses");
        setUsers(users.splice(-1));
        window.location = window.location.href;
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <ListItem>
      <ListItemAvatar sx={{ marginRight: 2 }}>
        <Avatar alt="avatar" src={image} sx={{ width: 75, height: 75 }} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="h6">{primaryText}</Typography>}
        secondary={<Typography variant="p">email: {secondaryText}</Typography>}
      />
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
      <IconButton onClick={openEdit}>
        <Edit />
      </IconButton>
      {isEditOpen && (
        <UpdateUserDialog
          open={isEditOpen}
          onClose={closeEdit}
          users={users}
          setUsers={setUsers}
          userId={userId}
        />
      )}
    </ListItem>    
  );
}

export default ListItemUser;
