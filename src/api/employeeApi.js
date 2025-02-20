// employeeApi.js

// Fetch employees from Reqres API
export const fetchEmployees = async () => {
    const response = await fetch('https://reqres.in/api/users?page=1'); // You can modify page if needed
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    return data.data; // Reqres stores user data in the 'data' field
  };
  
  // Delete employee function (no actual delete in Reqres, mock the action)
  export const deleteEmployee = async (id) => {
    console.log(`Mock deleting employee with ID: ${id}`);
  };
  
  // Optional: You can mock the add employee function since Reqres doesn't provide it
  export const addEmployee = async (employee) => {
    console.log('Mock adding employee:', employee);
    return {
      id: Math.random().toString(36).substr(2, 9), // Mock ID
      ...employee,
    };
  };
  