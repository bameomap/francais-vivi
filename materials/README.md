# materials/

Tài liệu tham khảo gốc (PDF, audio, ghi chú nội dung) dùng để soạn dữ liệu cho app.
Không phải code — app không đọc trực tiếp từ đây lúc chạy. Nội dung thực tế của
app nằm ở `src/data/*.js`, được soạn dựa trên tài liệu trong thư mục này.

## Cấu trúc

- `A1/` — tài liệu Édito A1 (đã hoàn thành)
  - `grammaire_edito_A1.md`, `vocabulaire_edito_A1.md` — ghi chú ngữ pháp/từ vựng dùng khi soạn `src/data/`
  - `Livre-pages/` — trang sách scan (PDF)
  - `Sujet DELF A1/` — đề thi thử DELF A1 (không commit — xem `.gitignore`)
- `A2/` — tài liệu Édito A2 (đang bắt đầu)
  - `EDITO A2/` — sách, cahier, guide pédagogique + audio (không commit — có file >100MB)
- `misc/` — file chưa rõ mục đích, chưa xếp loại (vd. `french.png`)

**Ngoại lệ:** `Nouvel_Edito_A1_audios_manuel/` (audio gốc A1) vẫn nằm ở **root**
của project, không trong `materials/`, vì `public/audio` là symlink trỏ tới nó —
app thực sự đọc audio từ đây lúc chạy nên không phải tài liệu tham khảo thuần túy.

## Quy ước khi thêm tài liệu mới

- Tài liệu A1 → `materials/A1/`, tài liệu A2 → `materials/A2/`.
- Ghi chú nội dung (từ vựng, ngữ pháp...) soạn dưới dạng `.md` ngay trong thư mục
  trình độ tương ứng, sau đó mới chuyển thành data thật trong `src/data/*.js`.
- File/thư mục nào nặng (>20MB) hoặc không cần lưu lịch sử git thì thêm vào
  `.gitignore` (theo pattern không có dấu `/` ở đầu để áp dụng ở mọi cấp thư mục).
