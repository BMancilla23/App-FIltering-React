import { setQuery } from '@redux/slice/productsReducer';
import { ChangeEvent } from 'react';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const userProfile = [
  {
    icon: (
      <AiOutlineHeart
        size={24}
        className='text-gray-600 hover:text-[#5E9E9C]'
      />
    ),
    path: '#',
  },
  {
    icon: (
      <AiOutlineShoppingCart
        size={24}
        className='text-gray-600 hover:text-[#5E9E9C]'
      />
    ),
    path: '#',
  },
  {
    icon: (
      <AiOutlineUserAdd
        size={24}
        className='text-gray-600 hover:text-[#5E9E9C]'
      />
    ),
    path: '#',
  },
];

export const Nav = () => {
  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <nav className='flex border-b-2 border-[#f3f3f3] justify-between items-center p-5 z-20 sticky top-0 bg-white'>
      <div className='flex items-center'>
        <input
          type='search'
          placeholder='Buscar productos...'
          className='relativ min-w-60 w-72 bg-[#f7f6f6] rounded-l p-2 outline-none'
          aria-label='Buscar zapatos'
          onChange={handleSearch}
        />
        {/*     <button className='bg-blue-500 text-white p-2 rounded-r'>Buscar</button> */}
      </div>
      <div className='flex space-x-4 gap-x-2'>
        {userProfile.map(({ icon, path }, index) => (
          <a key={index} href={path} aria-label='Favoritos'>
            {icon}
          </a>
        ))}
      </div>
    </nav>
  );
};
