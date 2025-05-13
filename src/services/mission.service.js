import { pool } from '../db.config.js';
import { responseFromMissioin,responseFromUserMissioin } from '../dtos/mission.dto.js';
import{newMission, getMission,findLocationBymissionId,newUserMission,getUserMission} from "../repositories/mission.repository.js"
import{getStore} from "../repositories/store.repository.js"

export const addMission = async (data) => {
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
      const addmissionId= await newMission({
          store_id:data.store_id,
          title: data.title,
          content:data.content,
          point: data.point,
          deadline: data.deadline
    });
    const mission = await getMission(addmissionId);
    const store = await getStore(data.store_id);
    console.log(mission[0]);
    console.log(store);
    
    return responseFromMissioin({mission, store});
  
}

export const challengeMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  console.log(userId,"+", missionId);
  try {
    // 1. 기존 도전 여부 확인
    const [exist] = await conn.query(
      `SELECT id FROM user_missions WHERE user_id = ? AND mission_id = ?`,
      [userId, missionId]
    );

    if (exist.length > 0) {
      return {
        success: false,
        message: '이미 도전 중인 미션입니다.',
      };
    }
    const location=await findLocationBymissionId(missionId);
    // 2. 미션 도전 등록
    await newUserMission({
          user_id:userId,
          mission_id: missionId,
          location_id:location[0].id
    });
    const usermission = await getUserMission(userId,missionId);
    const mission = await getMission(missionId);
  
    
    return responseFromUserMissioin({usermission, mission,location});
  } finally {
    conn.release();
  }
};
