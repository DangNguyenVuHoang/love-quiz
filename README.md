# Love Quiz (MockAPI)

Website nhỏ để hỏi sở thích và thu thập feedback sau 1 tháng.

## Cấu trúc
- index.html — trang chào
- quiz.html — khảo sát sở thích (POST /answers)
- result.html — xem kết quả đã gửi (localStorage)
- feedback.html — cập nhật cảm nhận (PUT /answers/:id)
- admin.html — xem danh sách (GET /answers)

## Cấu hình API
Sử dụng MockAPI base URL:
```
https://68b054b83b8db1ae9c039b7d.mockapi.io
```
Resource cần có tên **answers**.

## Chạy
Mở file `index.html` bằng Live Server hoặc bất kỳ HTTP server tĩnh nào.
