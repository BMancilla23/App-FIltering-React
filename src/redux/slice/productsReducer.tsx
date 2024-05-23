import { Product } from '@/interfaces/data.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const DEFAULT_CATEGORY = 'all';
const DEFAULT_PRICE_MAX = 1000;

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedCategory: string | null;
  selectedPriceRange: string;
  selectedColor: string | null;
  query: string;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  selectedCategory: DEFAULT_CATEGORY,
  selectedPriceRange: 'all',
  selectedColor: null,
  query: '',
};

const filterProducts = (
  items: Product[],
  category: string | null,
  priceRange: string,
  color: string | null
): Product[] => {
  let filteredItems = items;

  if (category !== DEFAULT_CATEGORY && category !== null) {
    const lowerCaseCategory = category.toLowerCase();
    filteredItems = filteredItems.filter(
      product => product.category.toLowerCase() === lowerCaseCategory
    );
  }

  if (priceRange !== 'all') {
    const priceRanges: Record<string, { min: number; max: number }> = {
      range1: { min: 0, max: 50 },
      range2: { min: 50, max: 100 },
      range3: { min: 100, max: 150 },
      range4: { min: 150, max: DEFAULT_PRICE_MAX },
    };
    const range = priceRanges[priceRange];

    filteredItems = filteredItems.filter(product => {
      const price = +product.newPrice;
      return price >= range.min && price <= range.max;
    });
  }

  if (color !== null) {
    const lowerCaseColor = color.toLowerCase();
    filteredItems = filteredItems.filter(
      product => product.color.toLowerCase() === lowerCaseColor
    );
  }

  return filteredItems;
};

const filterByQuery = (items: Product[], query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return items.filter(product =>
    product.title.toLowerCase().includes(lowerCaseQuery)
  );
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        action.payload,
        state.selectedPriceRange,
        state.selectedColor
      );
    },
    setSelectedPriceRange(state, action: PayloadAction<string>) {
      state.selectedPriceRange = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        state.selectedCategory,
        action.payload,
        state.selectedColor
      );
    },
    setSelectedColor(state, action: PayloadAction<string | null>) {
      state.selectedColor = action.payload;
      state.filteredItems = filterProducts(
        state.items,
        state.selectedCategory,
        state.selectedPriceRange,
        action.payload
      );
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.filteredItems = filterByQuery(state.items, action.payload);
    },
  },
});

export const {
  setProducts,
  setSelectedCategory,
  setSelectedPriceRange,
  setSelectedColor,
  setQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
