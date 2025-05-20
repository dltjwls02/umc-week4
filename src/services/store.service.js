import { responseFromReviews } from '../dtos/review.dto.js';
import { getAllStoreReviews } from '../repositories/user.repository.js';


export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};