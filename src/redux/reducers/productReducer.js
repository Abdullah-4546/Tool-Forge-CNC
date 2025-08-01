import { createSlice } from "@reduxjs/toolkit"
import { AdminDeleteProductById, AdminGetAllProduct, createProductReview, createSellerProduct, editSellerProduct, getAllProducts, getAllProductsByCategoryBased, productGetById, sellerDeleteProductById } from "../actions/productAction";

const loadCartItemsFromStorage = () => {
    try {
      const serializedCartItems = localStorage.getItem('cartItems');
      if (serializedCartItems === null) {
        return [];
      }
      const parsedItems = JSON.parse(serializedCartItems);
      return Array.isArray(parsedItems) ? parsedItems : []; // Ensure the parsed data is an array.

    //   return JSON.parse(serializedCartItems);
    } catch (error) {
      return [];
    }
  };

const initialState = {
    loading: false,
    error: null,
    message: null,
    loadingDelete: false, // New loading state for delete action
    data:[],
    cartItems: loadCartItemsFromStorage(),
}

const productReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const { product, quantity } = action.payload;
        const existingProductIndex = state.cartItems.findIndex((item) => item._id === product._id);
    
        if (existingProductIndex !== -1) {
            // If the product already exists in the cart, update its quantity
            state.cartItems[existingProductIndex].quantity += (quantity ? quantity : 1);
        } else {
            // If the product is not in the cart, add it with specified quantity or 1 if not provided
            state.cartItems.push({ ...product, quantity: (quantity ? quantity : 1) });
        }
    
        // Save updated cartItems to local storage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
  //   singalProductAddToCart: (state, action) => {
  //     const { product, quantity } = action.payload;
  //     const existingProductIndex = state.cartItems.findIndex((item) => item._id === product._id);

  //     if (existingProductIndex !== -1) {
  //         // If the product already exists in the cart, update its quantity
  //         state.cartItems[existingProductIndex].quantity += quantity;
  //     } else {
  //         // If the product is not in the cart, add it with specified quantity
  //         state.cartItems.push({ ...product, quantity });
  //     }

  //     // Save updated cartItems to local storage
  //     localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  // },
    
    
          removeFromCart: (state, action) => {
            const { productId } = action.payload;
            // Remove the product from the cart based on its ID
            state.cartItems = state.cartItems.filter((item) => item._id !== productId);
            // Save updated cartItems to local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          },
          increaseQuantity: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === productId);
            if (existingItem) {
              // Increase the quantity by 1
              existingItem.quantity += 1;
              // Save updated cartItems to local storage
              localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
          },
          decreaseQuantity: (state, action) => {
            const { productId } = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === productId);
            if (existingItem) {
              if (existingItem.quantity === 1) {
                // If quantity is already 1, remove the item from the cart
                state.cartItems = state.cartItems.filter((item) => item._id !== productId);
              } else {
                // Decrease the quantity by 1
                existingItem.quantity -= 1;
              }
              // Save updated cartItems to local storage
              localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
          },
          
          clearCart: (state) => {
            // Clear all items from the cart
            state.cartItems = [];
            // Clear cartItems from local storage
            localStorage.removeItem('cartItems');
          },
          getAllCartItems: (state) => {
            // Load cartItems from local storage and populate the state
            state.cartItems = loadCartItemsFromStorage();
          },
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers : (builder) => {
        builder
        // create seller product
        .addCase(createSellerProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createSellerProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(createSellerProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // edit seller product

        .addCase(editSellerProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editSellerProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(editSellerProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // product get by id

        .addCase(productGetById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(productGetById.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.singalData = action.payload.singalData
        })
        .addCase(productGetById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // seller delete by id

        .addCase(sellerDeleteProductById.pending, (state) => {
            state.loadingDelete = true; // Set loadingDelete to true for delete action
            state.error = null;
        })
        .addCase(sellerDeleteProductById.fulfilled, (state, action) => {
            state.loadingDelete = false; // Set loadingDelete to false when delete action is fulfilled
            state.message = action.payload.message;
        })
        .addCase(sellerDeleteProductById.rejected, (state, action) => {
            state.loadingDelete = false; // Set loadingDelete to false when delete action is rejected
            state.error = action.error;
        })
    
        .addCase(AdminGetAllProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(AdminGetAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        .addCase(AdminGetAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        .addCase(AdminDeleteProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(AdminDeleteProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        .addCase(AdminDeleteProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        .addCase(getAllProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

      .addCase(createProductReview.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload.message;
      })
      .addCase(createProductReview.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
      })

      .addCase(getAllProductsByCategoryBased.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllProductsByCategoryBased.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProductData = action.payload.categoryProductData;
        state.categoryName = action.payload.categoryName;
    })
    .addCase(getAllProductsByCategoryBased.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
    })

        
    }
})

export const { clearError, clearMessage , addToCart, removeFromCart, clearCart , getAllCartItems, decreaseQuantity, increaseQuantity} = productReducer.actions;
export default productReducer.reducer;
