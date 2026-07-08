// config.js - ฝั่งระบบแอดมินหลังบ้าน (Staff Portal)

const SUPABASE_URL = "https://knfhgytkfshdmfdieczx.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZmhneXRrZnNoZG1mZGllY3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDI4ODUsImV4cCI6MjA5NDQxODg4NX0.NnYLZB5agt5wjLs2vn62K5v9LnvO01BV3iCJhh-QRTE"; 

// 🎯 ลิงก์ตรงเข้าหา GAS Web App ตัวที่ 2 (Admin & Certificate Engine - ตัวสำหรับแอดมินสแกนเช็คอิน/เช็คเอาท์)
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycby_SfPfK-P6CAP7pdPgQJHHm_8nTwHBNfMNKNlYDSui67FS6Mfs2CqPD8WyTELPqDIW1w/exec"; 
const MAIN_REG_API_URL = GOOGLE_SHEET_API;
const CERT_STB_API = GOOGLE_SHEET_API; 

let supabaseClient;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

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
