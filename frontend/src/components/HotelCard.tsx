import { FC } from 'react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
}

interface HotelCardProps {
  hotel: Hotel;
  onDelete: () => void;
  onBook: () => void;
}

const HotelCard: FC<HotelCardProps> = ({ hotel, onDelete, onBook }) => (
  <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-black dark:text-white">{hotel.name}</h3>
    <p className="text-gray-500 dark:text-gray-400">{hotel.location}</p>
    <p className="text-green-500">${hotel.price}</p>
    <div className="mt-2">
      <button onClick={onDelete} className="bg-red-500 text-white p-2 rounded mr-2">
        Delete
      </button>
      <button onClick={onBook} className="bg-blue-500 text-white p-2 rounded">
        Book
      </button>
    </div>
  </div>
);

export default HotelCard;

