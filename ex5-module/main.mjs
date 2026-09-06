// ไฟล์เดียวที่มี console.log ได้ — เป็นไฟล์ "สั่งงานและแสดงผล"
import { getAllStudents } from './student-data.mjs';
import { toGrade, summarize } from './student-service.mjs';

const students = getAllStudents(); // ดึงข้อมูล (สำเนา) มาจากชั้นข้อมูล

console.log('id\tชื่อ\t\tคะแนน\tเกรด');
students.forEach((s) => {
  const grade = toGrade(s.score); // ส่งคะแนนเข้าไปให้ชั้นตรรกะคำนวณ ไม่คำนวณเองในไฟล์นี้
  console.log(`${s.id}\t${s.name}\t\t${s.score}\t${grade}`);
});

console.log('--- สรุป ---');
console.log(summarize(students));

/* คำตอบท้ายไฟล์ (ส่วนที่ 3):
1. ถ้าเพิ่มเกรด B+ ต้องแก้ไฟล์ไหนบ้าง?
   → student-service.mjs เท่านั้น เพราะ criteria (เกณฑ์เกรด) อยู่ในฟังก์ชัน toGrade ที่นั่น
     ไม่ต้องแตะ student-data.mjs หรือ main.mjs เลย

2. ถ้าย้ายข้อมูลไปฐานข้อมูลจริง ต้องแก้ไฟล์ไหนบ้าง?
   → student-data.mjs เท่านั้น เพราะเป็นไฟล์เดียวที่รู้ว่าข้อมูล "มาจากไหน"
     ฟังก์ชัน getAllStudents/findStudentById ยัง export ชื่อเดิม แค่ข้างในเปลี่ยนจากอ่าน array
     เป็นเรียก database query แทน — student-service.mjs และ main.mjs ไม่ต้องรู้เรื่องเลยแม้แต่บรรทัดเดียว

3. ทำไม student-service.mjs ถึงห้าม import ไฟล์ข้อมูล?
   → เพื่อแยกความรับผิดชอบ (separation of concerns) ให้ business logic เป็น "pure function"
     ที่รับข้อมูลผ่าน parameter เท่านั้น ทำให้เอาไปทดสอบ (unit test) ได้ง่ายโดยไม่ต้องพึ่งข้อมูลจริง
     และเอาไปใช้ซ้ำกับข้อมูลจากแหล่งไหนก็ได้ ไม่ผูกติดกับ student-data.mjs ไฟล์เดียว
*/