import { pool } from '../db.config.js';
import { responseFromReview } from '../dtos/review.dto.js';
import{newReview, getReivew} from "../repositories/review.repository.js"
import{getStore} from "../repositories/store.repository.js"

export const addReview = async (data) => {
  //{ storeId, userId, rating, content }
  const conn = await pool.getConnection();
  
  console.log(data.store_id);
    // 1. 가게 존재 여부 확인
    const [storeRows] = await conn.query(
      'SELECT id FROM stores WHERE id = ?',
      [data.store_id]
    )

    if (storeRows.length === 0) {
      console.log("없음");
      return null;  // 가게 없음
    }

    // 2. 리뷰 추가
    const addreviewId= await newReview({
      user_id:data.user_id,
        store_id:data.store_id,
        status:data.status,
        title: data.title,
        content:data.content,
        point: data.point
  });
console.log(addreviewId);
  const review = await getReivew(addreviewId);
  const store = await getStore(data.store_id);
  console.log(review[0]);
  console.log(store);
    // await conn.query(
    //   'INSERT INTO review (store_id, user_id, rating, content) VALUES (?, ?, ?, ?)',
    //   [storeId, userId, rating, content]
    // );

  //   return true;
  // } finally {
  //   conn.release();
  // }
  
  return responseFromReview({review, store});

};
