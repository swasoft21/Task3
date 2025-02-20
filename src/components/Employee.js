import React, { useEffect, useState } from 'react';
import { fetchEmployees, addEmployee, deleteEmployee } from '../api/employeeApi';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Modal, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ first_name: '', last_name: '', email: '' });

  useEffect(() => {
    fetchEmployees().then((data) => setEmployees(data));
  }, []);

  const handleAddEmployee = () => {
    addEmployee(newEmployee).then((newEmp) => {
      setEmployees([...employees, newEmp]); // Update state with new employee
      setOpenModal(false); // Close modal after adding
      Swal.fire('Success!', 'Employee added successfully.', 'success');
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(id).then(() => {
          setEmployees(employees.filter((emp) => emp.id !== id));
          Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
        });
      }
    });
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: 'orange', mb: 2 }}
        onClick={() => setOpenModal(true)}
      >
        Add Employee
      </Button>

      {/* Modal for adding new employee */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Employee
          </Typography>
          <TextField
            label="First Name"
            fullWidth
            sx={{ mb: 2 }}
            value={newEmployee.first_name}
            onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            sx={{ mb: 2 }}
            value={newEmployee.last_name}
            onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          />
          <Button variant="contained" sx={{ backgroundColor: 'orange' }} onClick={handleAddEmployee}>
            Add Employee
          </Button>
        </Box>
      </Modal>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.first_name} {emp.last_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>
                <Button variant="contained" sx={{ backgroundColor: 'orange', mr: 1 }}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(emp.id)}>
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

export default Employee;
