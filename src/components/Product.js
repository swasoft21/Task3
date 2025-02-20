import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/productApi';
import { Box,Card, CardContent, Typography, Button, CardMedia, Grid, CardActions, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2';
import { 
     
    DialogActions, // Import DialogActions
    TextField      // Import TextField
  } from '@mui/material';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewProduct, setViewProduct] = useState(null); // State for viewing product details

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id).then(() => {
          setProducts(products.filter((product) => product.id !== id));
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        });
      }
    });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );
    setProducts(updatedProducts);
    setEditProduct(null);
    Swal.fire('Success', 'Product updated successfully!', 'success');
  };

  const handleAddProduct = () => {
    setIsAdding(true);
    setEditProduct({
      id: products.length + 1,
      title: '',
      description: '',
      price: '',
      image: '',
    });
  };

  const handleSaveNewProduct = () => {
    setProducts([...products, editProduct]);
    setIsAdding(false);
    setEditProduct(null);
    Swal.fire('Success', 'Product added successfully!', 'success');
  };

  // Handle file input change
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditProduct({ ...editProduct, image: event.target.result }); // Set the image as a Base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle viewing product details
  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
      <Button
        variant="contained"
        sx={{ mb: 3, backgroundColor: '#FFA500', color: '#000' }}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#222' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', padding: '16px' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFA500' }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="textPrimary" sx={{ mt: 1, color: '#FFF' }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', width: '100%' }}>
    <Button 
      variant="outlined" 
      sx={{ color: '#FFA500', borderColor: '#FFA500' }} 
      onClick={() => handleEditProduct(product)}
    >
      Edit
    </Button>
    <Button 
      variant="contained" 
      sx={{ backgroundColor: '#FFA500', color: '#000' }} 
      onClick={() => handleDeleteProduct(product.id)}
    >
      Delete
    </Button>
    <Button 
      variant="contained" 
      sx={{ backgroundColor: 'red', color: '#FFF' }} 
      onClick={() => handleViewProduct(product)}
    >
      View
    </Button>
  </Box>
</CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Product Modal */}
      {viewProduct && (
        <Dialog open={true} onClose={() => setViewProduct(null)}>
          <DialogTitle sx={{ color: '#FFA500' }}>Product Details</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#222', color: '#FFF' }}>
            <img
              src={viewProduct.image}
              alt={viewProduct.title}
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '20px' }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFA500', mb: 2 }}>
              {viewProduct.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {viewProduct.description}
            </Typography>
            <Typography variant="body1">Price: ${viewProduct.price}</Typography>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#222' }}>
            <Button onClick={() => setViewProduct(null)} sx={{ color: '#FFA500' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit/Add Product Modal */}
      {editProduct && (
        <Dialog open={true} onClose={() => (isAdding ? setIsAdding(false) : setEditProduct(null))}>
          <DialogTitle sx={{ color: '#FFA500' }}>{isAdding ? 'Add Product' : 'Edit Product'}</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#222' }}>
            <TextField
              fullWidth
              label="Title"
              value={editProduct.title}
              onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
              sx={{ mb: 2, input: { color: '#FFF' }, label: { color: '#FFA500' } }}
            />
            <TextField
              fullWidth
              label="Description"
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              sx={{ mb: 2, input: { color: '#FFF' }, label: { color: '#FFA500' } }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
              sx={{ mb: 2, input: { color: '#FFF' }, label: { color: '#FFA500' } }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ backgroundColor: '#FFA500', color: '#000', mt: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {editProduct.image && (
              <img
                src={editProduct.image}
                alt="Product Preview"
                style={{ marginTop: '20px', maxHeight: '200px', maxWidth: '100%' }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#222' }}>
            <Button onClick={() => (isAdding ? setIsAdding(false) : setEditProduct(null))} sx={{ color: '#FFA500' }}>
              Cancel
            </Button>
            <Button
              onClick={isAdding ? handleSaveNewProduct : handleSaveEdit}
              sx={{ backgroundColor: '#FFA500', color: '#000' }}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Product;
