# Chép chính tả theo giọng thật — cách tạo mốc thời gian

Dictée trước đây đọc lại câu bằng **giọng máy** của trình duyệt: phát âm rõ
từng chữ, tốc độ đều, không nuốt âm — tức là ngược hẳn với đoạn băng mà người
học cần luyện tai. Bây giờ app phát **đúng những giây đó trong file mp3 thật**.

Không cắt file riêng cho từng câu: A1 + A2 đã hơn 800 câu, cắt ra là hơn 800
file mp3. Thay vào đó mỗi câu giữ một cặp `[giây bắt đầu, giây kết thúc]`, thẻ
`<audio>` nhảy tới đó và tự dừng. File mp3 đã publish không phải đụng tới.

## Vì sao phải nhận dạng giọng nói, khi transcript đã có sẵn?

Không phải để đọc nội dung — transcript trong sách đã chính xác 100%. Máy chỉ
làm một việc: **gắn đồng hồ vào từng từ**. Sau đó chuỗi từ máy nghe được đem so
khớp với chuỗi từ trong sách bằng một phép diff thông thường; câu nào lấy thời
gian của từ khớp đầu tiên và từ khớp cuối cùng của nó.

Nhờ vậy máy nghe sai vài chữ cũng không sao — chữ sai bị diff bỏ qua, ranh giới
câu vẫn đúng. Đó là lý do model `small` đã đủ dùng.

**Cách dò khoảng lặng bằng ffmpeg thì không dùng được** — đã thử: trong piste 2
có đoạn **20 giây nói liền một hơi không nghỉ**, mà sách chia đoạn đó thành 3
câu. Máy không thể tìm ra ranh giới ở chỗ không có khoảng lặng.

## Chạy

```bash
npm run align:refs -- b1 b2          # xuất transcript của những unité cần làm
python3 -m venv scripts/align-audio/.venv
scripts/align-audio/.venv/bin/pip install faster-whisper
scripts/align-audio/.venv/bin/python scripts/align-audio/align.py small
```

Kết quả ghi thẳng vào `src/data/editoTimingsA2.js`. **Chạy `align:refs` cho tất
cả unité đã có mốc thời gian**, không chỉ unité mới — file sinh ra thay thế
toàn bộ file cũ.

Chạy lần đầu sẽ tải model (~250MB) và tải các file mp3 vào `work/` (đã gitignore).

## Nên dùng model nào

Dùng **`small`**. Đã so với `medium` trên Unité 1:

| | thời gian chạy (6 phút audio) | kết quả |
|---|---|---|
| `small` | ~2 phút | chuẩn cả 51 câu |
| `medium` | ~34 phút | **sai 1 câu**, các câu khác lệch < 0.4s |

`medium` chậm hơn 17 lần mà lại tệ hơn: ở piste 3 nó "nghe" ra chữ trong đoạn
nhạc mở đầu (ảo giác kinh điển của Whisper: *"Sous-titres réalisés par la
communauté d'Amara.org"*), làm câu đầu tiên nuốt luôn 9.6 giây nhạc.

Script có bộ bắt lỗi này: câu nào có **tốc độ đọc bất thường** (quá chậm hoặc
quá nhanh so với số từ) sẽ bị cảnh báo — đúng dấu hiệu của kiểu lỗi trên. Đã
kiểm chứng: chạy trên kết quả `medium` thì bắt đúng câu sai, chạy trên `small`
thì không báo gì.

## Nếu có câu lệch

Mở bài đó trong app → tab **✏️ Chép** → bấm **▶ Nghe câu này**. Sai thì sửa tay
cặp số trong `src/data/editoTimingsA2.js`; lần chạy sau sẽ ghi đè, nên nhớ sửa
lại hoặc chỉnh thông số `PAD_IN` / `PAD_OUT` trong `align.py`.

Test trong `src/utils/dictee.test.js` bắt được trường hợp file mốc thời gian
lệch pha với transcript (thêm/bớt câu mà quên chạy lại) — vì lúc đó app sẽ phát
nhầm giây mà không báo lỗi gì cả, tệ hơn là không phát.
