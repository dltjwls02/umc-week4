import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { fetchMyReviews } from "../services/review.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

//   const user = await userSignUp(bodyToUser(req.body));
//   res.status(StatusCodes.OK).json({ result: user });
try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
    console.log("result:",user);
  } catch (err) {
    next(err); // 에러 핸들링
  }
};

export const myReviewsController = async (req, res) => {
  const userId = req.user.id; // 로그인 유저 ID (예: 미들웨어로부터)
  const cursor = Number(req.query.cursor) || 0;
  const limit = Number(req.query.limit) || 10;

  try {
    const reviews = await fetchMyReviews(userId, cursor, limit);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
