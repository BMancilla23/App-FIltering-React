import { FC } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsFillBagHeartFill } from 'react-icons/bs';

interface Props {
  title: string;
  img: string;
  category: string;
  color: string;
  company: string;
  newPrice: string;
  prevPrice: string;
  reviews: string;
  rating: number;
}

export const Card: FC<Props> = ({
  title,
  img,
  category,
  color,
  company,
  newPrice,
  prevPrice,
  reviews,
  rating,
}) => {
  return (
    <div className='m-5 w-[300px] border-2 flex-shrink-0 border-[#ededed] p-5 cursor-pointer'>
      <div className='w-full h-64 mb-4 overflow-hidden'>
        <img className='w-full h-full object-contain' src={img} alt={title} />
      </div>
      <div>
        <h3>{title}</h3>
        <div className='flex mb-4'>
          {[...Array(5)].map((_, i) =>
            i < rating ? (
              <AiFillStar key={i} className='text-[#d5ab55]' />
            ) : (
              <AiOutlineStar key={i} className='text-[#d5ab55]' />
            )
          )}
          <span className='text-sm ml-3'>{reviews}</span>
        </div>
        <div className='flex justify-around items-center'>
          <div>
            <del>{prevPrice}</del>
            {newPrice}
          </div>

          <div>
            <BsFillBagHeartFill className='text-[#535353]' />
          </div>
        </div>
      </div>
    </div>
  );
};
