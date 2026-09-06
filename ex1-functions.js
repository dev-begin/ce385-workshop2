
//1. ต้องการเช็คว่าเป็นตัวเลขจริงๆไม่ใช่ string , NaN เเละอยู่ในช่วง 100
const isValidScore = (score) =>
    typeof score === 'number' && !Number.isNaN(score) && score >=0 && score <= 100;
 
//2. toGrade(score) Hint บอกให้ใช้ array ของเกณฑ์ + find แทน if ซ้อนกันเยอะๆ
const toGrade = (score) => {
    const criteria = [
       { min: 80, grade: 'A'},
       { min: 75, grade: 'B+'},
       { min: 70, grade: 'B'},
       { min: 65, grade: 'C+'},
       { min: 60, grade: 'C'},
       { min: 55, grade: 'D+'},
       { min: 50, grade: 'D'},
       { min: 0, grade: 'F'},
    ];
    const result = criteria.find((c) => score >= c.min);
    return result.grade;
};
const calculateWorkshopScore = (raw, full = 60, weight = 20) =>
  (raw / full) * weight;
const calculateTotal = (workshop, attendance, project, midterm, final) =>
  workshop + attendance + project + midterm + final;
const students = [
  { name: 'สมชาย', workshopRaw: 48, attendance: 9, project: 18, midterm: 15, final: 20 },
  { name: 'สมหญิง', workshopRaw: 60, attendance: 10, project: 20, midterm: 18, final: 22 },
  { name: 'สมศักดิ์', workshopRaw: 30, attendance: 6, project: 12, midterm: 10, final: 15 },
];

console.log('ชื่อ\t\tWorkshop\tรวม\tเกรด');
students.forEach((s) => {
  const workshopScore = calculateWorkshopScore(s.workshopRaw);
  const total = calculateTotal(workshopScore, s.attendance, s.project, s.midterm, s.final);
  const grade = toGrade(total);
  console.log(`${s.name}\t\t${workshopScore.toFixed(1)}\t\t${total.toFixed(1)}\t${grade}`);
});
// พิสูจน์ว่า default parameter ทำงาน
console.log(calculateWorkshopScore(48) === calculateWorkshopScore(48, 60, 20)); // true

// เรียกโดยข้าม full ไปตั้งใจๆ ด้วย undefined
console.log(calculateWorkshopScore(48, undefined, 25));
// ผลลัพธ์ = (48/60)*25 = 20
// เหตุผล: การส่ง `undefined` ตรงตำแหน่ง full ทำให้ JS มองว่า "ไม่ได้ส่งค่ามา"
// จึงใช้ default (full = 60) แทน แต่ weight ที่ส่งมาเป็น 25 จะถูกใช้แทนค่า default (20)
// เพราะ default parameter จะทำงานเฉพาะตอนค่านั้นเป็น undefined เท่านั้น ไม่ใช่ null หรือค่าว่างอื่นๆ