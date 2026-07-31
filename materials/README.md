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

## ⚠ Audio A2 KHÔNG khớp với sách A2

`materials/A2/EDITO A2/Edito_A2_audios_manuel/` và `Edito_A2_audios_cahier/` là bản
rip CD của **Édito A2 édition 1 (2016)** — tag ID3 ghi `date=2016`, file đề ngày
2017, và mục lục bản 2016 là *Unité 1 « C'est la vie ! »*.

Nội dung app soạn theo **2e édition (2022)**, có *Unité 1 « Nouvelles vies »*.
Hai bản có bài nghe hoàn toàn khác nhau — không có số piste nào ghép được.
**Đừng thử map lại số piste**; phải lấy audio bản 2022 (qua didierfle.app,
quét trang sách) thì bước Nghe của A2 mới làm được.

**Ngoại lệ:** `Nouvel_Edito_A1_audios_manuel/` (audio gốc A1) vẫn nằm ở **root**
của project, không trong `materials/`, vì `public/audio` là symlink trỏ tới nó —
app thực sự đọc audio từ đây lúc chạy nên không phải tài liệu tham khảo thuần túy.

## Quy ước khi thêm tài liệu mới

- Tài liệu A1 → `materials/A1/`, tài liệu A2 → `materials/A2/`.
- Ghi chú nội dung (từ vựng, ngữ pháp...) soạn dưới dạng `.md` ngay trong thư mục
  trình độ tương ứng, sau đó mới chuyển thành data thật trong `src/data/*.js`.
- File/thư mục nào nặng (>20MB) hoặc không cần lưu lịch sử git thì thêm vào
  `.gitignore` (theo pattern không có dấu `/` ở đầu để áp dụng ở mọi cấp thư mục).
