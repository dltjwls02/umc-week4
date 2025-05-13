import { StatusCodes } from "http-status-codes";
import { challengeMission, addMission } from '../services/mission.service.js';
import { bodyToMission } from "../dtos/mission.dto.js";


export const handleAddMission = async (req,res) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);
  
    try {
      const mission = await addMission(bodyToMission(req.body));
      if (!mission) {
        return res.status(404).json({ message: '해당 가게를 찾을 수 없습니다.' });
      }
      res.status(StatusCodes.OK).json({ result: mission });
      //res.status(201).json({ message: '리뷰가 등록되었습니다.' });
      console.log("result: "+mission);
    } catch (error) {
      res.status(500).json({ message: '서버 오류 발생', error: error.message });
    }
};

export const handleChallengeMission = async (req, res) => {
  const { user_id, mission_id } = req.body;

  try {
    if (!user_id || !mission_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "user_id와 mission_id는 필수입니다."
      });
    }
    const um = await challengeMission(user_id, mission_id);
    console.log("Challenge Mission Result:", um); 
    if (!um) {
      return res.status(404).json({ message: "미션 도전 실패" });
    }
  res.status(StatusCodes.OK).json({ result: um });
    //res.status(201).json({ message: '미션 도전이 성공적으로 등록되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류 발생', error: err.message });
  }
};
