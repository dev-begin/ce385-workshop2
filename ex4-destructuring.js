const baseInfo = { id: '6501', name: 'สมชาย', major: 'CE' };
const scoreInfo = { id: '6501', score: 78, attendance: 9 };
const contactInfo = { id: '6501', contact: { email: 'somchai@dpu.ac.th', phone: '081-111-1111' } };

// ส่วนที่ 1: รวม 3 ก้อนเป็นก้อนเดียวด้วย spread + เพิ่ม grade
const toGrade = (score) => (score >= 50 ? 'ผ่าน' : 'ไม่ผ่าน'); // ใช้แบบง่ายในข้อนี้พอ

const mergeStudent = (base, score, contact) => ({
  // ...base ก่อน แล้ว ...score แล้ว ...contact ทับกันไปเรื่อยๆ
  // ลำดับสำคัญเพราะถ้ามี key ซ้ำกัน (เช่น id ซ้ำใน 3 ก้อน) ตัวที่เขียนทีหลังจะทับตัวก่อนหน้า
  ...base,
  ...score,
  ...contact,
  grade: toGrade(score.score), // เพิ่ม property ใหม่จากการคำนวณ
});

const merged = mergeStudent(baseInfo, scoreInfo, contactInfo);
console.log(merged);

// ส่วนที่ 2: พิสูจน์เรื่อง shallow copy
const copy = { ...merged };       // spread คัดลอกเฉพาะ "ชั้นบนสุด" ของ object
copy.contact.email = 'new@dpu.ac.th'; // แก้ค่าที่อยู่ "ชั้นลึก" (nested object)

console.log(copy.contact.email);    // "new@dpu.ac.th"
console.log(merged.contact.email);  // ก็จะเป็น "new@dpu.ac.th" เหมือนกัน! (เปลี่ยนตามด้วย)
// เหตุผล: { ...merged } คัดลอกแค่ "ที่อยู่อ้างอิง" (reference) ของ contact object มา
// ไม่ได้สร้าง contact object ใหม่ทั้งอัน ดังนั้น copy.contact กับ merged.contact
// จริงๆ แล้วชี้ไปที่ object เดียวกันในหน่วยความจำ แก้ผ่านตัวไหนก็กระทบอีกตัว

// แก้ให้คัดลอกได้ถูกต้อง (deep copy เฉพาะ contact)
const properCopy = { ...merged, contact: { ...merged.contact } };
// รอบนี้เราสั่ง spread contact แยกอีกชั้นหนึ่งด้วย ทำให้ได้ contact object ใหม่จริงๆ
properCopy.contact.email = 'another@dpu.ac.th';
console.log(properCopy.contact.email); // "another@dpu.ac.th"
console.log(merged.contact.email);     // ยังเป็นค่าเดิม ไม่เปลี่ยนตามแล้ว — พิสูจน์ว่าคราวนี้แยกกันจริง

// ส่วนที่ 3: Destructuring + Rest
const formatStudent = ({ name, score, grade, major = 'ไม่ระบุ' }) =>
  // destructuring ใน parameter: แกะ property ที่ต้องการออกมาจาก object ที่ส่งเข้ามาโดยตรง
  // major = 'ไม่ระบุ' คือ default เฉพาะ property นี้ ถ้า object ที่ส่งมาไม่มี major เลย
  `${name} | คะแนน ${score} | เกรด ${grade} | สาขา ${major}`;

console.log(formatStudent(merged));

// rest: แยก contact ออกจากข้อมูลที่เหลือ
const { contact, ...publicData } = merged;
// contact จะได้ค่า merged.contact ไปเลย
// ...publicData จะได้ "ทุก property ที่เหลือ" ยกเว้น contact มารวมเป็น object ใหม่
console.log(publicData); // จะไม่มี contact อยู่ข้างในเลย

// ทำไม API จริงไม่ควรส่ง contact ออกไปให้ทุกคน:
// contact เก็บอีเมล/เบอร์โทร ซึ่งเป็นข้อมูลส่วนบุคคล ถ้า endpoint ที่คืนรายชื่อนักศึกษาทั้งหมด
// (เช่นหน้าดูอันดับคะแนน) ส่ง contact ติดไปด้วย จะเป็นการเปิดเผยข้อมูลส่วนตัวเกินความจำเป็น
// (privacy / least-privilege) ควรส่งเฉพาะ field ที่หน้านั้นต้องใช้จริงเท่านั้น