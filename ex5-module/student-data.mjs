// ตัวแปร array นี้ "ห้าม export" ตรงๆ — ป้องกันไฟล์อื่นมาแก้ข้อมูลตรงๆ โดยไม่ผ่านฟังก์ชัน
const students = [
  { id: '6501', name: 'สมชาย', major: 'CE', score: 78 },
  { id: '6502', name: 'สมหญิง', major: 'IT', score: 85 },
  { id: '6503', name: 'สมศักดิ์', major: 'CE', score: 42 },
  { id: '6504', name: 'สมปอง', major: 'IT', score: 55 },
  { id: '6505', name: 'สมหวัง', major: 'CE', score: 90 },
  { id: '6506', name: 'สมใจ', major: 'IT', score: 66 },
];

// named export: ต้อง export ทีละชื่อแบบนี้ (ตามเงื่อนไข "ใช้ named export เท่านั้น")
export const getAllStudents = () =>
  // คืน "สำเนา" ด้วย [...students] ไม่ใช่ตัวแปร students ตรงๆ
  // เพราะถ้าคืนตัวจริงไป ไฟล์อื่นจะ push/แก้ข้อมูลต้นฉบับได้โดยตรง ซึ่งขัดกับ "ต้องคืนสำเนา ไม่ใช่ตัวจริง"
  [...students];

export const findStudentById = (id) =>
  students.find((s) => s.id === id); // object เดี่ยวไม่มี array ห่อ เลยคืนตรงๆ ได้ (ตัวมันเองก็เป็นสำเนาทางความหมายเวลาถูกใช้แค่ id)