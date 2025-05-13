import { pool } from "../db.config.js";

export const newReview = async (data) =>{
    const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO review (user_id,status, title, content, point) VALUES (?, ?, ?, ?, ?);`,
      [
        data.user_id,
        data.status,
        data.title,
        data.content,
        data.point,
      ]
    ); 

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getReivew = async(reveiwId)=>{
    const conn = await pool.getConnection();
    try{
        const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, [reveiwId]);
        if (!review || review.length == 0) {
            console.log("없음");
        return null;
        }
        return review;
    }catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }

};