import { createSlice } from "@reduxjs/toolkit";
import {
  createBiddingContainer,
  editSellerContainer,
  sellerDeleteContainerById,
  // fetchContainersBySellerId,
  getAllContainers,
  containerGetById,
  placeBid,
  fetchBids,
} from "../actions/containerAction";

const initialState = {
  loading: false,
  error: null,
  message: null,
  data: [],
  containers:{},
  bids: {} ,
};

const containerReducer = createSlice({
  name: "container",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // Create bidding container
    builder
      .addCase(createBiddingContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBiddingContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Bidding container created successfully"; // Safeguard
      })
      .addCase(createBiddingContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

    // Update bidding container
      .addCase(editSellerContainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSellerContainer.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Container updated successfully"; // Safeguard
      })
      .addCase(editSellerContainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

    // Delete bidding container
      .addCase(sellerDeleteContainerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerDeleteContainerById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Container Deleted successfully";
        state.singalData = action.payload.singalData

      })
      .addCase(sellerDeleteContainerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(getAllContainers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllContainers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.containers = action.payload.data;
    //     state.data = action.payload.containers; // Adjust this line
    // state.containers = action.payload.containers; // Adjust this line
    })
    .addCase(getAllContainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
    })

    // Get bidding containers by seller id
      // .addCase(fetchContainersBySellerId.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchContainersBySellerId.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload;
      // })
      // .addCase(fetchContainersBySellerId.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error;
      // })


          // Get bidding container by container  id
    .addCase(containerGetById.pending, (state) => {
      state.loading = true;
      state.error = null; 
  })
  .addCase(containerGetById.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
      state.containers = action.payload.data;
  })
  .addCase(containerGetById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
  })

  .addCase(placeBid.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(placeBid.fulfilled, (state, action) => {
    state.loading = false;
    const { containerId, bid } = action.payload.data;
    if (!state.bids[containerId]) {
      state.bids[containerId] = {
        bids: [],
        highestBid: 0, // Initialize highest bid
      };
    }
    state.bids[containerId].bids.push(bid);
    if (bid.amount > state.bids[containerId].highestBid) {
      state.bids[containerId].highestBid = bid.amount;
    }
    state.message = action.payload.message || "Bid placed successfully";
  })
  .addCase(placeBid.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error;
  })



  .addCase(fetchBids.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchBids.fulfilled, (state, action) => {
    state.loading = false;
    const {  data } = action.payload; 
    console.log("{ containerId, data } in fetchbids fulfiled :", data.containerId  )
    console.log("{ containerId, data } in fetchbids fulfiled :",  data.bids  )
    console.log("{ containerId, data } in fetchbids fulfiled :", data.highestBid )
        state.bids[ data.containerId] = {
        bids: data.bids, 
        highestBid: data.highestBid,
    };
    console.log("Bids in fetchBids.fulfilled:",state.bids[data.containerId])
})
  .addCase(fetchBids.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error;
  });
  
  }
});

export const { clearError, clearMessage } = containerReducer.actions;
export default containerReducer.reducer;
