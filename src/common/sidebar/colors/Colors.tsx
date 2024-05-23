import { FC, useEffect, useRef } from 'react';

interface ColorOption {
  id: string;
  label: string;
  color: string;
}

interface ColorsProps {
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

export const Colors: FC<ColorsProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const colorOptions: ColorOption[] = [
    { id: 'all', label: 'Todos', color: 'gray' },
    { id: 'black', label: 'Negro', color: 'black' },
    { id: 'blue', label: 'Azul', color: 'blue' },
    { id: 'red', label: 'Rojo', color: 'red' },
    { id: 'green', label: 'Verde', color: 'green' },
    { id: 'white', label: 'Blanco', color: 'white' },
  ];

  const radioRefs = useRef<Partial<{ [key: string]: HTMLDivElement | null }>>(
    {}
  );

  const handleColorChange = (colorId: string | null) => {
    setSelectedColor(colorId);
  };

  const handleRadioChange = (colorId: string) => {
    handleColorChange(colorId === 'all' ? null : colorId);
    Object.keys(radioRefs.current).forEach(key => {
      if (key !== colorId && radioRefs.current[key]) {
        radioRefs.current[key]?.classList.remove('bg-blue-500');
        radioRefs.current[key]?.classList.add('bg-gray-300');
      }
    });
    if (radioRefs.current[colorId]) {
      radioRefs.current[colorId]?.classList.add('bg-blue-500');
    }
  };

  useEffect(() => {
    if (selectedColor !== null) {
      handleRadioChange(selectedColor);
    }
  }, [selectedColor]);

  return (
    <div className='flex flex-col gap-y-4'>
      <h5 className='text-md font-semibold'>Color</h5>

      <div className='flex flex-col gap-y-1'>
        {colorOptions.map(colorOption => (
          <label
            key={colorOption.id}
            className='flex items-center gap-x-3 relative cursor-pointer'
          >
            <input
              type='radio'
              name='color'
              value={colorOption.id}
              checked={selectedColor === colorOption.id}
              onChange={() => handleRadioChange(colorOption.id)}
              className='hidden'
            />
            <div
              ref={el => (radioRefs.current[colorOption.id] = el)}
              className={`relative h-5 w-5 rounded-full cursor-pointer border-[1px] border-black transition duration-200 mr-2 ${selectedColor === colorOption.id ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => handleRadioChange(colorOption.id)}
              style={{ backgroundColor: colorOption.color }}
            >
              {selectedColor === colorOption.id && (
                <div className='absolute left-[28%] top-[28%] bg-white rounded-full h-2 w-2'></div>
              )}
            </div>
            <span className='text-gray-700'>{colorOption.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
