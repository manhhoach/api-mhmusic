Tạo file .env và config các biến: 
SECRET_KEY
googleClientID_mail, googleClientSecret_mail, refreshToken_mail, mail(nếu k dùng chức năng quên mật khẩu thì bỏ phần này)
DB_NAME, DB_USER, DB_HOST, DB_PASSWORD (nếu k có thì sẽ kết nối db local, sửa thông tin kết nối tại src/db/config)

Mở terminal và gõ
    npm i
    tsc -w
    npm run dev
