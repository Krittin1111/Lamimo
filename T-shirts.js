// ควบคุมการทำงานของแท็บ
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('[role="tabpanel"]'); // เปลี่ยนชื่อจาก contents เป็น tabContents

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // ลบสถานะ active จากแท็บและเนื้อหาที่ถูกเลือกก่อนหน้า
        tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        tabContents.forEach(content => content.hidden = true);

        // ตั้งค่ากับแท็บและเนื้อหาที่ถูกเลือกใหม่
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        const contentId = tab.getAttribute('aria-controls');
        document.getElementById(contentId).hidden = false;
    });
});

// เลือกลิงก์ Pagination และเนื้อหาของแต่ละหน้า
const links = document.querySelectorAll('.pagination-link'); // ลิงก์ Pagination
const pageContents = document.querySelectorAll('.page-content'); // เนื้อหาของหน้าแต่ละหน้า
const nextButton = document.querySelector('.pagination-next'); // ปุ่มถัดไป
const prevButton = document.querySelector('.pagination-prev'); // ปุ่มก่อนหน้า

let currentPage = 1; // หน้าปัจจุบัน เริ่มต้นที่หน้า 1

// ฟังก์ชันสำหรับอัปเดตการแสดงผล
function updatePageDisplay(page) {
    // ซ่อนเนื้อหาทั้งหมด
    pageContents.forEach(content => {
        content.style.display = 'none'; // ซ่อนหน้า
    });

    // แสดงเฉพาะหน้าที่เลือก
    const selectedPageContent = document.querySelector(`.page-content[data-page="${page}"]`);
    if (selectedPageContent) {
        selectedPageContent.style.display = 'grid'; // ใช้ grid display ตามที่คุณใช้ใน CSS
    }

    // อัปเดตสถานะ Active ของลิงก์ Pagination
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === String(page)) {
            link.classList.add('active');
        }
    });

    // ปิดการใช้งานปุ่ม Prev และ Next ตามเงื่อนไข
    prevButton.disabled = page === 1; // ปิดปุ่ม Prev เมื่ออยู่หน้าแรก
    nextButton.disabled = page === pageContents.length; // ปิดปุ่ม Next เมื่ออยู่หน้าสุดท้าย

    // เลื่อนหน้าจอไปยังด้านบน
    window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
}

// Event Listener สำหรับลิงก์ Pagination
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
        currentPage = parseInt(link.getAttribute('data-page')); // อัปเดตหน้าปัจจุบัน
        updatePageDisplay(currentPage); // อัปเดตการแสดงผล
    });
});

// Event Listener สำหรับปุ่ม Next
nextButton.addEventListener('click', () => {
    if (currentPage < pageContents.length) {
        currentPage += 1; // เพิ่มหน้าปัจจุบัน
        updatePageDisplay(currentPage); // อัปเดตการแสดงผล
    }
});

// Event Listener สำหรับปุ่ม Prev
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 1; // ลดหน้าปัจจุบัน
        updatePageDisplay(currentPage); // อัปเดตการแสดงผล
    }
});

// เรียกใช้งานครั้งแรก
updatePageDisplay(currentPage);

// เมื่อคลิกที่ลิงก์ ลบการเน้น
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        link.blur(); // ลบการเน้น
    });
});






