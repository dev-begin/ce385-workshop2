// ส่วนที่ 1: ข้อมูลตั้งต้น — array ของ object 6 คน ตามโจทย์
// แต่ละคนมี id, name, major, score, contact (nested object)
const students = [
  { id: '6501', name: 'สมชาย', major: 'CE', score: 78, contact: { email: 'somchai@dpu.ac.th', phone: '081-111-1111' } },
  { id: '6502', name: 'สมหญิง', major: 'IT', score: 85, contact: { email: 'somying@dpu.ac.th', phone: '082-222-2222' } },
  { id: '6503', name: 'สมศักดิ์', major: 'CE', score: 42, contact: { email: 'somsak@dpu.ac.th', phone: '083-333-3333' } },
  { id: '6504', name: 'สมปอง', major: 'IT', score: 55, contact: { email: 'sompong@dpu.ac.th', phone: '084-444-4444' } },
  { id: '6505', name: 'สมหวัง', major: 'CE', score: 90, contact: { email: 'somwang@dpu.ac.th', phone: '085-555-5555' } },
  // คนนี้ตั้งใจไม่ใส่ contact ไว้ทดสอบ ส่วนที่ 3
  { id: '6506', name: 'สมใจ', major: 'IT', score: 66 },
];

// ส่วนที่ 2: ฟังก์ชันค้นหา — ทุกตัว return, ห้ามแก้ array ต้นฉบับ

// หานักศึกษาจาก id เดียว
const findById = (students, id) =>
  // .find() ไล่ดูทีละตัวใน array แล้วคืน "ตัวแรก" ที่เงื่อนไขเป็นจริง
  // ถ้าไม่เจอเลยสักตัว .find() จะคืน undefined ให้อัตโนมัติ (ตรงตามที่โจทย์ต้องการพอดี)
  students.find((s) => s.id === id);

// หานักศึกษาทั้งหมดในสาขาที่ระบุ
const findByMajor = (students, major) =>
  // .filter() ไล่ดูทุกตัว เก็บเฉพาะตัวที่เงื่อนไขเป็นจริงไว้ใน array ใหม่
  // ถ้าไม่เจอเลย จะได้ array ว่าง [] ไม่ error
  students.filter((s) => s.major === major);

// เช็คว่ามีใครตกไหม (คะแนนต่ำกว่า 50 อย่างน้อย 1 คน)
const hasFailingStudent = (students) =>
  // .some() เช็คว่า "มีอย่างน้อยหนึ่งตัว" ที่เงื่อนไขเป็นจริงไหม คืนค่าเป็น true/false เท่านั้น
  students.some((s) => s.score < 50);

// ดึงอีเมล พร้อมกันกรณีหาไม่เจอ หรือเจอแต่ไม่มี contact
const getEmail = (students, id) => {
  const student = findById(students, id); // ใช้ฟังก์ชันที่เขียนไว้แล้ว ไม่เขียนโค้ดหาซ้ำ
  // ?. คือ optional chaining — ถ้า student เป็น undefined (หาไม่เจอ) จะไม่ error
  // แต่จะหยุดแล้วคืน undefined ทันที แทนที่จะพยายามอ่าน .contact ของ undefined (ซึ่งจะ error)
  // ถ้า student เจอ แต่ contact เป็น undefined (คนที่ 6506) ก็จะหยุดตรงนี้เหมือนกัน
  const email = student?.contact?.email;
  // ?? คือ nullish coalescing — ถ้าฝั่งซ้าย (email) เป็น undefined หรือ null เท่านั้น
  // ถึงจะใช้ฝั่งขวาแทน (ต่างจาก || ตรงที่ || จะ trigger แม้ค่าเป็น 0 หรือ "" ด้วย ซึ่งไม่ใช่สิ่งที่เราต้องการที่นี่)
  return email ?? 'ไม่พบข้อมูลติดต่อ';
};

// ส่วนที่ 3: ทดสอบกรณีหาไม่เจอ
console.log(findById(students, '9999'));      // undefined — ไม่มี id นี้จริง
console.log(getEmail(students, '9999'));      // "ไม่พบข้อมูลติดต่อ" — หา student ไม่เจอเลย
console.log(getEmail(students, '6506'));      // "ไม่พบข้อมูลติดต่อ" — เจอ student แต่ไม่มี contact