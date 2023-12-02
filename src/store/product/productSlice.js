const { createSlice } = require("@reduxjs/toolkit");
const {
  getCategory,
  getProductss,
  getProductbyId,
  Rating,
} = require("./asyncActions");
const productSlice = createSlice({
  name: "product",
  initialState: {
    categorys: null,
    products: null,
    productData: null,
    isLoading: false,
    mes: "",
    actives: "",
    rating: false,
  },
  reducers: {
    setActive: (state, action) => {
      state.actives = action.payload;
    },
    updateRating: (state, action) => {
      state.rating = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categorys = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;

        state.categorys = null;
        state.mes = action.payload?.data?.mes;
      });
    //get product
    builder
      .addCase(getProductss.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductss.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProductss.rejected, (state, action) => {
        state.isLoading = false;

        state.products = null;
        state.mes = action.payload?.data?.mes;
      });
    //get product by id
    builder
      .addCase(getProductbyId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductbyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload;
      })
      .addCase(getProductbyId.rejected, (state, action) => {
        state.isLoading = false;

        state.productData = null;
        state.mes = action.payload?.data?.mes;
      });
  },
});
export const { setActive, updateRating } = productSlice.actions;
export default productSlice.reducer;
