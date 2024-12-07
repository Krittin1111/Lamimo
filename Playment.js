document.addEventListener("DOMContentLoaded", function () {
    const checkmark = document.getElementById("checkmark");
    const returnButton = document.getElementById("returnButton");
  
    // เพิ่ม Animation ให้ Checkmark
    setTimeout(() => {
      checkmark.style.transform = "rotate(720deg)";
      checkmark.style.opacity = "1";
    }, 500); // เริ่มหลังจาก 500ms
  
    // เมื่อคลิกปุ่ม Return to Shop
    returnButton.addEventListener("click", () => {
      alert("Redirecting to shop...");
      window.location.href = "https://www.example.com"; // แก้ลิงก์ตามจริงทีหลังงงงงง
    });
  });
  
