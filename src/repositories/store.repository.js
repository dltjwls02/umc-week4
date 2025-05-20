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

export const getMissionsByStoreId = async (storeId) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: storeId,
      },
      select: {
        id: true,
        storeId: true,
        title: true,
        description: true,
        status: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return missions;
  } catch (error) {
    throw new Error(`미션 목록 조회 중 오류가 발생했습니다: ${error.message}`);
  }
};

export const getStoreMissions = async (storeId) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: storeId,
      },
      select: {
        id: true,
        storeId: true,
        title: true,
        description: true,
        status: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return missions;
  } catch (error) {
    throw new Error(`미션 목록 조회 중 오류가 발생했습니다: ${error.message}`);
  }
};