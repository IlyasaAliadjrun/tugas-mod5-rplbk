import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";


function AddUserDialog({ open, onClose, users, setUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = () => {
    axios
      .post(`https://gorest.co.in/public/v2/users?access-token=cc35c3d0973112840479414ba7dea488b2a640d1321dcb1d33d04e823ef58909`, {
        name: name,
        email: email,
        gender: gender,
        status: status
      })
      .then((res) => {
        setUsers([...users, res.data]);
        console.log(res.data);
        window.alert("Sukses");
        window.location = window.location.href;
      })
      .catch((error) => {
        console.log(error)
        window.alert(error)
      });
      
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          padding: "8px 20px",
        }}
      >
        <TextField
          name="name"
          label="Name"
          placeholder="Masukan Nama"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          placeholder="Akun @gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="gender"
          label="Gender"
          placeholder="male atau female"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;
