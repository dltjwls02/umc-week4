import { pool } from "../db.config.js";

export const getStore  = async(storeId)=>{
    const conn = await pool.getConnection();
    try{
        const [store] = await pool.query(`SELECT * FROM stores WHERE id = ?;`, [storeId]);
        if (!store || store.length == 0) {
            console.log("없음");
        return null;
        }
        console.log(store[0].name);
        return store;
    }catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};