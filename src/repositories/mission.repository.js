import { pool } from "../db.config.js";
import { getStore } from "./store.repository.js";

export const newMission = async (data) =>{
    const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO missions (store_id,title, content, point,deadline) VALUES (?, ?, ?, ?,?);`,
      [
        data.store_id,
        data.title,
        data.content,
        data.point,
        data.deadline
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

export const getMission = async(missionId)=>{
    const conn = await pool.getConnection();
    try{
        const [mission] = await pool.query(`SELECT * FROM missions WHERE id = ?;`, [missionId]);
        if (!mission || mission.length == 0) {
            console.log("없음");
        return null;
        }
        return mission;
    }catch (err) {
    throw new Error(
      `{getMission}오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }

};

export const newUserMission = async (data) =>{
    const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO user_missions (user_id, mission_id,location_id,status, createAt, updatedAt) VALUES (?, ?, ?,'도전중', NOW(), NOW())`,
      [data.user_id, data.mission_id,data.location_id]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `{newUserMission}오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getUserMission = async(userId,missionId)=>{
    const conn = await pool.getConnection();
    try{
        const [mission] = await pool.query(`SELECT * FROM user_missions WHERE user_id = ? AND mission_id=?;`, [userId,missionId]);
        if (!mission || mission.length == 0) {
            console.log("없음");
        return null;
        }
        return mission;
    }catch (err) {
    throw new Error(
      `{getUserMission}오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }

};

export const findLocationBymissionId= async(missionId)=>{
    const conn = await pool.getConnection();
    try{
        console.log(missionId);
        const [mission] = await pool.query(`SELECT * FROM missions WHERE id = ?;`, [missionId]);
        if (!mission || mission.length == 0) {
            console.log("mission 없음");
        return null;
        }
        console.log(mission[0].store_id);
        const store=await getStore(mission[0].store_id);
        if (!store || store.length == 0) {
            console.log("storeid 없음");
        return null;
        }
        console.log(store[0].name);
        const [location] = await pool.query('select * from locations where id = ?;',[store[0].location_id]);
        if (!location || location.length == 0) {
            console.log("location 없음");
            return null;
        }
        return location;
    }catch (err) {
    throw new Error(
      `{findLocationBymissionId}오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }

};