export const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data; // This will return the array of products
  };
  
  export const deleteProduct = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Product with ID ${id} deleted`), 1000);
    });
  };
  