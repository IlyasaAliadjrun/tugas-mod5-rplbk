import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "./components/AddUserDialog";



function App() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  useEffect(() => {
    async function getUsers() {
      await axios
        .get(
          `https://gorest.co.in/public/v2/users?access-token=cc35c3d0973112840479414ba7dea488b2a640d1321dcb1d33d04e823ef58909`
        )
        .then((res) => {
          const responseData = res.data;
          console.log(res.data);
          setUsers(responseData);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getUsers();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List User</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
          <List>
            {users.map((d) => (
              <ListItemUser
                key={d.id}
                primaryText={d.name}
                secondaryText={d.email}
                users={users}
                setUsers={setUsers}
                userId={d.id}
              />
            ))}
            {newUsers.map((d) => (
              <ListItemUser
                key={d.id}
                primaryText={d.name}
                secondaryText={d.email}
                users={newUsers}
                setUsers={setNewUsers}
                userId={d.id}
              />
            ))}
          </List>
        </Paper>
      </div>
      {isDialogOpen && (
        <AddUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          users={newUsers}
          setUsers={setNewUsers}
        />
      )}
      
    </div>
  );
}

export default App;
