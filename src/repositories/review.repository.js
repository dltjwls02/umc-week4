import { prisma } from "../db.config.js";

export const newReview = async (data) =>{

  try {
    const result = await prisma.review.create({
      data: {
        user_id: data.user_id,
        store_id: data.store_id,
        status: data.status,
        title: data.title,
        content: data.content,
        point: data.point,
      },
    });

    return result.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    )
  }
};

// export const getReivew = async(reveiwId)=>{
//     try{
//         const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, [reveiwId]);
//         if (!review || review.length == 0) {
//             console.log("없음");
//         return null;
//         }
//         return review;
//     }catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }

// };
// 예시
export const getReview = async (storeId, query) => {
    return previewReviewResponseDTO(await getPreviewReview(reviewId, size, storeId));
}

export const previewReviewResponseDTO = (data) => {
    return {"reviewData": null, "cursorId": null};
}

