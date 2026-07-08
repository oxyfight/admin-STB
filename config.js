// config.js - ไฟล์ตั้งค่าศูนย์กลางของระบบ OXYFIGHT CENTER

const SUPABASE_URL = "https://knfhgytkfshdmfdieczx.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZmhneXRrZnNoZG1mZGllY3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDI4ODUsImV4cCI6MjA5NDQxODg4NX0.NnYLZB5agt5wjLs2vn62K5v9LnvO01BV3iCJhh-QRTE"; 

// 🎯 ลิงก์ตรงเข้าหา GAS Web App ตัวที่ 1 (Register Online Gateway) ประจำ OXYFIGHT CENTER
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbwhlsJvqaSkIlL5Isgij0cuZDPLkaQDsPZ0dCE-0MnPS7h3Li9ms2U-6SmgYWMUuyhK/exec"; 
const MAIN_REG_API_URL = GOOGLE_SHEET_API;

// ประกาศตัวแปรเซสชันเรียกใช้ในระบบแอดมินหลังบ้าน
let supabaseClient;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ฟังก์ชันกลางสำหรับตรวจสอบสิทธิ์ (Route Guard) ถ้าไม่ได้ล็อกอินให้เด้งไปหน้าแรก
async function checkAuthGuard() {
    if (!supabaseClient) return;
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session && !window.location.pathname.endsWith('index.html')) {
            window.location.href = "index.html";
        }
        return session;
    } catch (e) {
        console.error("Auth Guard Failure:", e);
    }
}

// ฟังก์ชันสากลสำหรับปุ่ม Log out ออกจากระบบแอดมิน
async function handleGlobalLogout() {
    if (supabaseClient) {
        try {
            await supabaseClient.auth.signOut();
            window.location.href = "index.html";
        } catch (e) {
            console.error("Logout Error:", e);
            window.location.href = "index.html";
        }
    }
}
