import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/productApi';
import { Card, CardContent, Typography, Button, CardMedia, Grid, CardActions, Dialog, TextField, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Track the product being edited

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

  // Open the edit form
  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  // Handle saving the edited product
  const handleSaveEdit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );
    setProducts(updatedProducts);
    setEditProduct(null);
    Swal.fire('Success', 'Product updated successfully!', 'success');
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
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
                {/* <Typography variant="body2" color="textSecondary" sx={{ color: '#ccc' }}>
                  {product.description}
                </Typography> */}
                <Typography variant="body1" color="textPrimary" sx={{ mt: 1, color: '#FFF' }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button variant="outlined" sx={{ color: '#FFA500', borderColor: '#FFA500' }} onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#FFA500', color: '#000' }} onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Product Modal */}
      {editProduct && (
        <Dialog open={true} onClose={() => setEditProduct(null)}>
          <DialogTitle sx={{ color: '#FFA500' }}>Edit Product</DialogTitle>
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
              sx={{ input: { color: '#FFF' }, label: { color: '#FFA500' } }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#222' }}>
            <Button onClick={() => setEditProduct(null)} sx={{ color: '#FFA500' }}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} sx={{ backgroundColor: '#FFA500', color: '#000' }} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Product;
