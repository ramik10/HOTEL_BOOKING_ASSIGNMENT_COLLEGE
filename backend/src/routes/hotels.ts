import { Router } from 'express';
import { 
    getHotels, 
    addHotel, 
    getAveragePrice, 
    searchHotelsByName, 
    getHotelsUnion, 
    getHotelsIntersect, 
    getHotelsInPopularLocations, 
    getFrequentHotels, 
    bookHotel,
    deleteHotel,
    updateHotel
  } from '../controllers/hotels';

const router = Router();

router.get('/', getHotels);
router.post('/', addHotel);
router.delete('/:id', deleteHotel);
router.put('/:id', updateHotel);
router.get('/average-price', getAveragePrice);
router.get('/search', searchHotelsByName);
router.get('/union', getHotelsUnion);
router.get('/intersect', getHotelsIntersect);
router.get('/popular-locations', getHotelsInPopularLocations);
router.get('/frequent-hotels', getFrequentHotels);
router.post('/book', bookHotel);

export default router;
