import { Nav } from './common/navigation';
import { FilterLayout } from './layouts/FilterLayout';
import { Products } from './components/products';
import { Recommended } from './components/recommended';

export const App = () => {
  return (
    <>
      <FilterLayout>
        <Nav />
        <Recommended />
        <Products />
      </FilterLayout>
    </>
  );
};
