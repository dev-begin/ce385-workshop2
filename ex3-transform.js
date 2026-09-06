const students = [
  { id: '6501', name: 'สมชาย', major: 'CE', score: 78, contact: { email: 'somchai@dpu.ac.th', phone: '081-111-1111' } },
  { id: '6502', name: 'สมหญิง', major: 'IT', score: 85, contact: { email: 'somying@dpu.ac.th', phone: '082-222-2222' } },
  { id: '6503', name: 'สมศักดิ์', major: 'CE', score: 42, contact: { email: 'somsak@dpu.ac.th', phone: '083-333-3333' } },
  { id: '6504', name: 'สมปอง', major: 'IT', score: 55, contact: { email: 'sompong@dpu.ac.th', phone: '084-444-4444' } },
  { id: '6505', name: 'สมหวัง', major: 'CE', score: 90, contact: { email: 'somwang@dpu.ac.th', phone: '085-555-5555' } },
  { id: '6506', name: 'สมใจ', major: 'IT', score: 66 },
];

// ...ฟังก์ชันเดิมของคุณตามด้านล่างนี้...
// ทุกฟังก์ชันห้ามใช้ for/while — ต้องใช้ map/filter/reduce เท่านั้น

// array ของชื่อทุกคน
const getNames = (students) =>
  // .map() แปลงทุกตัวใน array เป็นค่าใหม่ ทีละตัว โดย array ผลลัพธ์ยาวเท่าเดิมเสมอ
  students.map((s) => s.name);

// array ของคนที่คะแนน >= 50
const getPassedStudents = (students) =>
  students.filter((s) => s.score >= 50);

// ผลรวมคะแนนทั้งหมด
const getTotalScore = (students) =>
  // .reduce() ไล่สะสมค่าไปทีละตัว โดยมี "ตัวสะสม" (sum) วิ่งไปเรื่อยๆ
  // (sum, s) => sum + s.score  หมายถึง เอาค่าสะสมเดิม บวกคะแนนของคนปัจจุบัน
  // เลข 0 ท้ายสุดคือ "ค่าเริ่มต้น" ของตัวสะสม — ต้องใส่ ไม่งั้นถ้า array ว่างจะ error
  students.reduce((sum, s) => sum + s.score, 0);

// คะแนนเฉลี่ย ทศนิยม 2 ตำแหน่ง / array ว่างต้องคืน 0 ไม่ใช่ NaN
const getAverageScore = (students) => {
  if (students.length === 0) return 0; // กันหารด้วย 0 ซึ่งจะได้ NaN
  const total = getTotalScore(students); // ใช้ฟังก์ชันที่มีอยู่แล้ว ไม่คำนวณซ้ำ
  return Number((total / students.length).toFixed(2));
  // .toFixed(2) ปัดเป็นทศนิยม 2 ตำแหน่ง แต่มันคืนค่าเป็น string เช่น "72.50"
  // เลยครอบด้วย Number(...) แปลงกลับเป็นตัวเลขจริง
};

// นับจำนวนคนแยกตามเกรด เช่น { A: 2, B: 1, F: 1 }
const toGrade = (score) => {
  const criteria = [
    { min: 80, grade: 'A' }, { min: 75, grade: 'B+' }, { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' }, { min: 60, grade: 'C' }, { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' }, { min: 0, grade: 'F' },
  ];
  return criteria.find((c) => score >= c.min).grade;
};

const countByGrade = (students) =>
  // ค่าเริ่มต้นของ reduce ตรงนี้คือ object ว่าง {} (ตาม Hint ในสไลด์)
  students.reduce((counts, s) => {
    const grade = toGrade(s.score);
    // ถ้ายังไม่เคยนับเกรดนี้มาก่อน (counts[grade] เป็น undefined) ให้เริ่มที่ 0 แล้วค่อย +1
    counts[grade] = (counts[grade] ?? 0) + 1;
    return counts; // reduce ต้อง return ตัวสะสมกลับไปทุกรอบ ไม่งั้นรอบถัดไปจะได้ undefined
  }, {});

// นักศึกษาคะแนนสูงสุด (ต้องกันกรณี array ว่าง ไม่ error)
const getTopStudent = (students) => {
  if (students.length === 0) return undefined; // ไม่มีใครเลย ก็ไม่มี "คนสูงสุด"
  return students.reduce((top, s) => (s.score > top.score ? s : top));
  // reduce แบบไม่ใส่ค่าเริ่มต้น: รอบแรกจะเอา "ตัวแรกของ array" มาเป็นตัวสะสมตั้งต้นเลย
  // แล้วไล่เทียบทีละคนว่าใครคะแนนสูงกว่า top ปัจจุบัน ถ้าสูงกว่าก็เปลี่ยน top เป็นคนนั้น
};

// ส่วนที่ 2: ท่อข้อมูลต่อกัน filter -> map -> reduce
// หาคะแนนเฉลี่ยเฉพาะนักศึกษาสาขา CE
const averageCEScore =
  students
    .filter((s) => s.major === 'CE')   // 1) กรองเอาเฉพาะ CE ก่อน
    .map((s) => s.score)                // 2) แปลง object เป็นแค่ตัวเลขคะแนน
    .reduce((sum, score, _, arr) => sum + score / arr.length, 0);
    // 3) สะสมค่าเฉลี่ยไปทีละตัว — arr คือ array ทั้งหมดหลัง filter/map (parameter ตัวที่ 4 ของ callback)
    //    หาร score ด้วย arr.length ก่อนบวกทุกรอบ จะได้ผลรวมเฉลี่ยโดยไม่ต้องหารซ้ำท้ายสุด
console.log(averageCEScore);

// ส่วนที่ 3: ทดสอบ array ว่าง — ต้องไม่มีตัวไหน error
console.log(getNames([]));           // []
console.log(getPassedStudents([]));  // []
console.log(getTotalScore([]));      // 0
console.log(getAverageScore([]));    // 0
console.log(countByGrade([]));       // {}
console.log(getTopStudent([]));      // undefined