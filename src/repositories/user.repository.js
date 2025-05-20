import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
      return null;
    }

    const created = await prisma.user.create({ data: data });
    return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  // const conn = await pool.getConnection();

  // try {
  //   const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, [userId]);

  //   if (!user || user.length == 0) {
  //       console.log("없음");
  //     return null;
  //   }

  //   return user;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  // const conn = await pool.getConnection();

  // try {
  //   await pool.query(
  //     `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
  //     [foodCategoryId, userId]
  //   );

  //   return;
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  // const conn = await pool.getConnection();

  // try {
  //   const [preferences] = await pool.query(
  //     "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
  //       "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
  //       "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
  //     userId
  //   );

  //   return preferences || [];
  // } catch (err) {
  //   throw new Error(
  //     `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  //   );
  // } finally {
  //   conn.release();
  // }
   const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};


export const getAllStoreReviews = async (storeId) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

// user.repository.js (또는 review.repository.js)
export const getMyReviews = async (userId, cursor = 0, limit = 10) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId,
      id: {
        gt: cursor,  // cursor가 0이면 무시됨
      },
    },
    orderBy: {
      id: "asc",
    },
    take: limit,
    include: {
      store: {  // 가게 정보 포함
        select: {
          id: true,
          name: true,
          location: true,
        },
      },
    },
  });

  return reviews;
};

