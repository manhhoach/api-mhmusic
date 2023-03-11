export default function convertTZ(date: Date) {
    return new Date(date).toLocaleString("vi-VN", { timeZone: 'Asia/Ho_Chi_Minh' });
}