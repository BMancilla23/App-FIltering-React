import data from '@/data/data';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setProducts } from '@redux/slice/productsReducer';

export const Products = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state: any) => state.products.filteredItems
  );

  useEffect(() => {
    dispatch(setProducts(data));
  }, [dispatch]);

  return (
    <section className='flex flex-col justify-center md:flex-row flex-wrap md:justify-start'>
      {filteredProducts.map((product: any, index: any) => (
        <Card key={index} {...product} />
      ))}
    </section>
  );
};
