import React, { useEffect, useState } from 'react';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import Swal from 'sweetalert2';

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees().then((data) => setEmployees(data));
  }, []);

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
      <Button variant="contained" sx={{ backgroundColor: 'orange', mb: 2 }}>
        Add Employee
      </Button>
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
