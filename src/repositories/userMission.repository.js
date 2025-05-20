import { prisma } from "../db.config.js";

export const completeUserMission = async (userId, userMissionId) => {
  const mission = await prisma.userMission.findFirst({
    where: {
      id: userMissionId,
      userId: userId,
      status: "IN_PROGRESS",
    },
  });

  if (!mission) {
    throw new Error("진행 중인 미션이 존재하지 않거나 이미 완료되었습니다.");
  }

  const updated = await prisma.userMission.update({
    where: { id: userMissionId },
    data: { status: "COMPLETED" },
  });

  return updated;
};

export const getActiveMissionsByUserId = async (userId) => {
  return await prisma.userMission.findMany({
    where: {
      userId: userId,
      status: 'IN_PROGRESS',
    },
    select: {
      id: true,
      missionId: true,
      status: true,
      mission: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          startDate: true,
          endDate: true,
          store: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
};