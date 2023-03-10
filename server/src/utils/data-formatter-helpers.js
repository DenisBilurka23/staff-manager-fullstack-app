import dayjs from "dayjs";

export const formatDataTime = (data) => {
  return data.map((user) => ({
    ...user,
    createdAt: dayjs(user.createdAt).format("DD.MM.YYYY HH:mm"),
    updatedAt: dayjs(user.updatedAt).format("DD.MM.YYYY HH:mm"),
  }));
};
