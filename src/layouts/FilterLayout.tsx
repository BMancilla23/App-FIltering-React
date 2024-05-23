import { Sidebar } from '@/common/sidebar/Sidebar';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const FilterLayout: FC<Props> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-grow px-5 ml-[200px]'>{children}</main>
      {/* Flex-grow toma todo
      el espacio restante*/}
    </div>
  );
};
