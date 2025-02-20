export const fetchEmployees = () => {
    return fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((data) => data.data);
  };
  
  export const deleteEmployee = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Employee with ID ${id} deleted`), 1000);
    });
  };
  