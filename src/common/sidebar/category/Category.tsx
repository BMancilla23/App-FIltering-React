import { FC, useRef, useEffect } from 'react';

interface Category {
  id: string;
  label: string;
}

interface CategoryProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Category: FC<CategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const radioRefs = useRef<Partial<{ [key: string]: HTMLDivElement | null }>>(
    {}
  );

  const categories: Category[] = [
    { id: 'all', label: 'Todos' },
    { id: 'sneakers', label: 'Zapatillas' },
    { id: 'shoes', label: 'Zapatos' },
    { id: 'sandals', label: 'Sandalias' },
    { id: 'heels', label: 'Tacones' },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    // Resalta la categoría seleccionada al cambiar `selectedCategory`
    Object.keys(radioRefs.current).forEach(key => {
      if (radioRefs.current[key]) {
        const isActive =
          key === selectedCategory ||
          (key === 'all' && selectedCategory === 'all');
        radioRefs.current[key]?.classList.toggle('bg-blue-500', isActive);
        radioRefs.current[key]?.classList.toggle('bg-gray-300', !isActive);
      }
    });
  }, [selectedCategory]);

  return (
    <div className='flex flex-col gap-y-4'>
      <h5 className='text-md font-semibold'>Categoría</h5>

      <div className='flex flex-col gap-y-1'>
        {categories.map(category => (
          <label
            key={category.id}
            className='flex items-center gap-x-3 relative cursor-pointer'
          >
            <input
              type='radio'
              name='category'
              value={category.id}
              checked={
                selectedCategory === category.id ||
                (category.id === 'all' && selectedCategory === 'all')
              }
              onChange={() => handleCategoryChange(category.id)}
              className='hidden'
            />
            <div
              ref={el => (radioRefs.current[category.id] = el)}
              className={`relative h-5 w-5 rounded-full cursor-pointer transition duration-200 mr-2 ${selectedCategory === category.id || (category.id === 'all' && selectedCategory === 'all') ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {(selectedCategory === category.id ||
                (category.id === 'all' && selectedCategory === 'all')) && (
                <div className='absolute left-[28%] top-[28%] bg-white rounded-full h-2 w-2'></div>
              )}
            </div>
            <span className='text-gray-700'>{category.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
