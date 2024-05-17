import { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import DarkModeToggle from '../components/DarkModeToggle';
import backend from '@/lib/backend';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
}

const Home = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [searchName, setSearchName] = useState('');
  const [averagePrice, setAveragePrice] = useState<number | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const response = await backend.get('/hotels');
    setHotels(response.data);
  };

  const addHotel = async () => {
    const response = await backend.post('/hotels', { name, location, price });
    setHotels([...hotels, response.data]);
    setName('');
    setLocation('');
    setPrice('');
  };

  const deleteHotel = async (id: number) => {
    await backend.delete(`/hotels/${id}`);
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const updateHotel = async (id: number) => {
    const response = await backend.put(`/hotels/${id}`, { name, location, price });
    setHotels(hotels.map(hotel => (hotel.id === id ? response.data : hotel)));
  };

  const fetchAveragePrice = async () => {
    const response = await backend.get('/hotels/average-price');
    setAveragePrice(response.data.average_price);
  };

  const searchHotels = async () => {
    const response = await backend.get(`/hotels/search?name=${searchName}`);
    setHotels(response.data);
  };

  const fetchHotelsUnion = async () => {
    const response = await backend.get('/hotels/union');
    setHotels(response.data);
  };

  const fetchHotelsIntersect = async () => {
    const response = await backend.get('/hotels/intersect');
    setHotels(response.data);
  };

  const fetchPopularLocations = async () => {
    const response = await backend.get('/hotels/popular-locations');
    setHotels(response.data);
  };

  const fetchFrequentHotels = async () => {
    const response = await backend.get('/hotels/frequent-hotels');
    setHotels(response.data);
  };

  const bookHotel = async (id: number) => {
    await backend.post('/hotels/book', { hotelId: id });
    // Optionally refetch or update the state to reflect the booking
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Hotel Booking System</h1>
        <DarkModeToggle />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {hotels.map(hotel => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onDelete={() => deleteHotel(hotel.id)}
            onBook={() => bookHotel(hotel.id)}
          />
        ))}
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Hotel Name"
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded mr-2"
        />
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location"
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded mr-2"
        />
        <input
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded mr-2"
        />
        <button
          onClick={addHotel}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Hotel
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          placeholder="Search Hotel by Name"
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded mr-2"
        />
        <button
          onClick={searchHotels}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search Hotels
        </button>
      </div>
      <button
        onClick={fetchAveragePrice}
        className="bg-green-500 text-white p-2 rounded mr-2"
      >
        Get Average Price
      </button>
      <button
        onClick={fetchHotelsUnion}
        className="bg-purple-500 text-white p-2 rounded mr-2"
      >
        Get Hotels Union
      </button>
      <button
        onClick={fetchHotelsIntersect}
        className="bg-orange-500 text-white p-2 rounded mr-2"
      >
        Get Hotels Intersect
      </button>
      <button
        onClick={fetchPopularLocations}
        className="bg-teal-500 text-white p-2 rounded mr-2"
      >
        Get Hotels in Popular Locations
      </button>
      <button
        onClick={fetchFrequentHotels}
        className="bg-pink-500 text-white p-2 rounded"
      >
        Get Frequent Hotels
      </button>
      {averagePrice && <p className="mt-4">Average Price: ${averagePrice}</p>}
    </div>
  );
};

export default Home;

