import { useDispatch, useSelector } from 'react-redux';
import { Category } from './category/Category';
import { Colors } from './colors/Colors';
import { Price } from './price/Price';
import {
  setSelectedCategory,
  setSelectedColor,
  setSelectedPriceRange,
} from '@redux/slice/productsReducer';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { selectedCategory, selectedPriceRange, selectedColor } = useSelector(
    (state: any) => state.products
  );

  const handleSetSelectedCategory = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSetSelectedPriceRange = (priceRange: string) => {
    dispatch(setSelectedPriceRange(priceRange));
  };

  const handleSetSelectedColor = (color: string | null) => {
    dispatch(setSelectedColor(color));
  };

  return (
    <aside className='min-w-[200px] fixed h-screen z-30 flex p-5 flex-col gap-y-4 flex-shrink-0 border-r-2 bg-white border-[#e5e5e5]'>
      <h1 className='text-2xl font-semibold mb-10 uppercase'>
        Shop
        <span className='text-[#5E9E9C]'>Filter</span>
      </h1>
      <Category
        selectedCategory={selectedCategory || 'all'}
        setSelectedCategory={handleSetSelectedCategory}
      />
      <Price
        selectedCategory={selectedCategory || 'all'}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={handleSetSelectedPriceRange}
      />
      <Colors
        selectedColor={selectedColor || 'all'}
        setSelectedColor={handleSetSelectedColor}
      />
    </aside>
  );
};
