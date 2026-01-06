
# LAMIMO-Website

**LAMIMO** คือเว็บไซต์อีคอมเมิร์ซสำหรับสินค้าแฟชั่น (Women / Men) ที่พัฒนาขึ้นเพื่อฝึกทำระบบ “หน้าบ้าน–หลังบ้าน” ให้เชื่อมต่อกันจริง โดยมีฟังก์ชันหลักตั้งแต่สมัครสมาชิก/เข้าสู่ระบบ ไปจนถึงการจัดการ **Cart** และ **Wish-list** พร้อมระบบยืนยันตัวตนแบบ **JWT** และการแยกสิทธิ์การเข้าถึง (User / Admin)

## ฟีเจอร์หลัก
- Authentication: Register / Login ด้วย JWT (เก็บ Token ใน localStorage หรือ sessionStorage)
- Cart
  - เพิ่มสินค้าเข้า Cart
  - ปรับจำนวนสินค้า (+ / -)
  - ลบสินค้า
- Wish-list
  - เพิ่มสินค้าเข้า Wish-list
  - ล้าง Wish-list
  - ป้องกันการเพิ่มซ้ำ (อิง productId + size + user)
- Admin (พื้นฐาน)
  - API สำหรับดูสถิติโดยรวม เช่น จำนวนผู้ใช้ / จำนวนสินค้าใน cart / wishlist

---

## เทคโนโลยีที่ใช้
**Frontend**
- HTML / CSS / JavaScript (เรียกใช้งาน REST API)

**Backend**
- Java + Spring Boot
- Spring Security + JWT
- Spring Data JPA (Hibernate)

**Database**
- MySQL (ใช้ XAMPP เป็นตัวช่วยรันฐานข้อมูล)

---

## โครงสร้างโปรเจกต์ (โดยสรุป)
- Frontend: ไฟล์หน้าเว็บต่าง ๆ (เช่น `Home.html`, `Login.html`, `Cart.html`, `Wish_list.html`, ฯลฯ) + โฟลเดอร์ `css/`, `js/`, `image/`
- Backend: `Lamimo_Backend/` (Spring Boot)

---

## สิ่งที่ต้องมี (Prerequisites)
- XAMPP (MySQL)
- IntelliJ IDEA (รัน Spring Boot)
- JDK (เวอร์ชันตามที่โปรเจกต์ตั้งค่าไว้)
- Postman สำหรับทดสอบ API
- VS Code + Live Server สำหรับเปิด Frontend

---

## วิธีรันโปรเจกต์ (Run Project)

### 1) เปิดฐานข้อมูลด้วย XAMPP
1. เปิด **XAMPP Control Panel**
2. กด Start ที่ **MySQL**
3. ตรวจสอบว่า MySQL ทำงานอยู่ (ปกติพอร์ต 3306)

---

### 2) รัน Backend (Spring Boot) ด้วย IntelliJ
1. เปิดโปรเจกต์ฝั่ง Backend ใน IntelliJ: `Lamimo_Backend`
2. รอให้ Maven/Gradle โหลด dependency ให้ครบ
3. กดปุ่ม **Run** ที่ไฟล์ main application
4. เมื่อรันสำเร็จ Backend จะพร้อมใช้งานที่:
   - `http://localhost:8080`

---

### 3) เปิด Frontend (แนะนำใช้ Live Server)
1. เปิดโฟลเดอร์โปรเจกต์ฝั่ง Frontend ด้วย **VS Code**
2. คลิกขวาไฟล์ `Home.html` แล้วเลือก **Open with Live Server**
3. เว็บจะเปิดบนเบราว์เซอร์ (ตัวอย่าง):
   - `http://127.0.0.1:5500/...`

หมายเหตุ: ต้องรัน Backend ไว้ก่อน เพื่อให้หน้าเว็บเรียก API ได้

---

## การทดสอบระบบสิทธิ์ (Auth / Role)

### User
- สมัครสมาชิกจากหน้า Register แล้ว Login เพื่อรับ Token
- Token จะถูกเก็บใน `localStorage` หรือ `sessionStorage` (ตามตัวเลือก keep signed in)
- เมื่อเรียก endpoint ที่ต้องล็อกอิน จะต้องส่ง Header:
  - `Authorization: Bearer <token>`

### Admin
- Admin จะเป็น role ที่ใช้เรียก **Admin API** (เช่น endpoint summary)
- แนวทางเดโม: สร้างบัญชี admin ไว้ล่วงหน้า (Bootstrap) หรือปรับ role ในฐานข้อมูล
- หมายเหตุ: ถ้านำขึ้น Production ควรจัดการผ่าน ENV/Secret และมีหน้าจัดการผู้ใช้/สิทธิ์จริง

---

## ตัวอย่าง Endpoint (อ้างอิง)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Cart
- `GET /api/cart`
- `POST /api/cart/items`
- `PATCH /api/cart/items/{itemId}`
- `DELETE /api/cart/items/{itemId}`

### Wish-list
- `GET /api/wishlist`
- `POST /api/wishlist/items`
- `DELETE /api/wishlist` (ล้างทั้งหมด)

### Admin (ตัวอย่างที่ทดสอบผ่าน Postman)
- `GET /api/admin/summary`
  - ต้องเป็น **ADMIN** และส่ง `Authorization: Bearer <token>`
  - ตัวอย่าง response:
    ```json
    {
      "wishlistItems": 0,
      "users": 3,
      "cartItems": 6
    }
    ```

---

## หมายเหตุเพิ่มเติม
- โปรเจกต์นี้ทำเพื่อฝึกเชื่อมต่อ Frontend–Backend และฝึกระบบ Auth + Role
- หากพบปัญหา CORS / Token หมดอายุ ให้ Login ใหม่และตรวจสอบว่า Backend รันอยู่ที่ `localhost:8080`

