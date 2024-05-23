import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; // Ajusta esto según tu configuración
import { Product } from '@/interfaces/data.type';

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface PriceProps {
  selectedCategory: string;
  selectedPriceRange: string;
  setSelectedPriceRange: (priceRange: string) => void;
}

export const Price: FC<PriceProps> = ({
  selectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
}) => {
  const products = useSelector((state: any) => state.products.items);

  const calculatePriceRanges = (products: Product[]): PriceRange[] => {
    // Filtrar productos según la categoría seleccionada
    const filteredProducts =
      selectedCategory === 'all'
        ? products
        : products.filter(
            product =>
              product.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    // Calcular precios mínimo y máximo de los productos filtrados
    const prices = filteredProducts.map(product => +product.newPrice);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 1000; // Valor predeterminado razonable

    return [
      { id: 'all', label: 'Todos', min: 0, max: Infinity },
      {
        id: 'range1',
        label: `S/${minPrice} - S/${minPrice + 50}`,
        min: minPrice,
        max: minPrice + 50,
      },
      {
        id: 'range2',
        label: `S/${minPrice + 50} - S/${minPrice + 100}`,
        min: minPrice + 50,
        max: minPrice + 100,
      },
      {
        id: 'range3',
        label: `S/${minPrice + 100} - S/${minPrice + 150}`,
        min: minPrice + 100,
        max: minPrice + 150,
      },
      {
        id: 'range4',
        label: `Más de S/${minPrice + 150}`,
        min: minPrice + 150,
        max: Infinity,
      },
    ];
  };

  const priceRanges = calculatePriceRanges(products);

  const radioRefs = useRef<Partial<{ [key: string]: HTMLDivElement | null }>>(
    {}
  );

  const handlePriceRangeChange = (priceRangeId: string) => {
    setSelectedPriceRange(priceRangeId);
  };

  useEffect(() => {
    Object.keys(radioRefs.current).forEach(key => {
      if (radioRefs.current[key]) {
        const isActive =
          key === selectedPriceRange ||
          (key === 'all' && selectedPriceRange === 'all');
        radioRefs.current[key]?.classList.toggle('bg-blue-500', isActive);
        radioRefs.current[key]?.classList.toggle('bg-gray-300', !isActive);
      }
    });

    console.log(selectedPriceRange);
  }, [selectedPriceRange]);

  return (
    <div className='flex flex-col gap-y-4'>
      <h5 className='text-md font-semibold'>Precio</h5>

      <div className='flex flex-col gap-y-1'>
        {priceRanges.map(priceRange => (
          <label
            key={priceRange.id}
            className='flex items-center gap-x-3 relative cursor-pointer'
          >
            <input
              type='radio'
              name='price'
              value={priceRange.id}
              checked={selectedPriceRange === priceRange.id}
              onChange={() => handlePriceRangeChange(priceRange.id)}
              className='hidden'
            />
            <div
              ref={el => (radioRefs.current[priceRange.id] = el)}
              className={`relative h-5 w-5 rounded-full cursor-pointer transition duration-200 mr-2 ${selectedPriceRange === priceRange.id ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => handlePriceRangeChange(priceRange.id)}
            >
              {selectedPriceRange === priceRange.id && (
                <div className='absolute left-[28%] top-[28%] bg-white rounded-full h-2 w-2'></div>
              )}
            </div>
            <span className='text-gray-700'>{priceRange.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
