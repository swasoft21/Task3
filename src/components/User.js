import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Swal from 'sweetalert2';

const User = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    if (isEditing) {
      // Update the existing user
      const updatedUsers = users.map((user) =>
        user.id === editUserId ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditUserId(null);
      Swal.fire('Success', 'User updated successfully!', 'success');
    } else {
      // Add a new user
      const newUser = { ...formData, id: users.length + 1 };
      setUsers([...users, newUser]);
      Swal.fire('Success', 'User added successfully!', 'success');
    }

    // Clear the form
    setFormData({ firstName: '', lastName: '', phone: '', address: '' });
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setFormData(userToEdit);
    setIsEditing(true);
    setEditUserId(id);
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: 'orange' }}
          onClick={handleAddUser}
        >
          {isEditing ? 'Save Changes' : 'Add User'}
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default User;
