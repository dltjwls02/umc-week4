import { StatusCodes } from "http-status-codes";
import { addReview } from '../services/review.service.js';
import { bodyToReview } from "../dtos/review.dto.js";

export const handleAddReview = async (req, res) => {
  console.log("리뷰 추가를를 요청했습니다!");
  console.log("body:", req.body);
  //const { storeId, userId, point, content } = req.body;

  try {
    const review = await addReview(bodyToReview(req.body));
    if (!review) {
      return res.status(404).json({ message: '해당 가게를 찾을 수 없습니다.' });
    }
    res.status(StatusCodes.OK).json({ result: review });
    //res.status(201).json({ message: '리뷰가 등록되었습니다.' });
    console.log("result: "+review);
  } catch (error) {
    res.status(500).json({ message: '서버 오류 발생', error: error.message });
  }
};


