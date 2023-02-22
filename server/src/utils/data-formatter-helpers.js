import dayjs from "dayjs";

export const formatDataTime = (data) => data.map(user => ({
    ...user,
    date_created: dayjs(user.date_created).format('DD.MM.YYYY HH:mm')
}))