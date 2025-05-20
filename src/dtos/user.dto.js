export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    sex: body.sex,
    birth,
    address: body.address || "",
    detail_address: body.detail_address || "",
    phone: body.phone,
    preferences: body.preferences,
  };
};

// export const responseFromUser = (data) => {
//   const { user, preferences } = data;
//   //const userInfo = user; // getUser는 배열 반환
//    console.log("가입된 사용자:", user); 
//     console.log("선호사항:", preferences);

//   return {
//     id: user[0].id,
//     email: user[0].email,
//     name: user[0].name,
//     sex: user[0].sex,
//     birth: user[0].birth,
//     address: user[0].address,
//     detail_address: user[0].detail_address,
//     phone: user[0].phone,
//     preferences: (preferences).map((pref) => ({
//       id: pref.id,
//       categoryId: pref.food_category_id,
//       categoryName: pref.name,
//     })),
//   };
// };

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

interface MyReviewsRequestDTO {
  cursor?: number; // optional, 마지막 리뷰 id
  limit?: number;  // optional, 가져올 리뷰 개수
}

interface ReviewDTO {
  id: number;
  user_id: number;
  status: string;
  title: string;
  content: string;
  point: number;
  store: {
    id: number;
    name: string;
    location: string;
  };
}

interface MyReviewsResponseDTO {
  reviews: ReviewDTO[];
}
