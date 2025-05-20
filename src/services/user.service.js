import { responseFromUser } from "../dtos/user.dto.js";
import { getMyReviews } from "../repositories/review.repository.js";


import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    sex: data.sex,
    birth: data.birth,
    address: data.address,
    detail_address: data.detail_address,
    phone: data.phone,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
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

export const fetchMyReviews = async (userId, cursor, limit) => {
  const reviews = await getMyReviews(userId, cursor, limit);
  return reviews.map(r => ({
    id: r.id,
    user_id: r.userId,
    status: r.status || "",
    title: r.title || "",
    content: r.content || "",
    point: r.point || "",
    store: {
      id: r.store.id,
      name: r.store.name,
      location: r.store.location,
    },
  }));
};