// ไฟล์นี้ห้าม import อะไรเลย และห้าม console.log — รับข้อมูลผ่าน parameter เท่านั้น
// นี่คือ "ชั้นตรรกะธุรกิจ" (business logic) ล้วนๆ ไม่ผูกกับว่าข้อมูลมาจากไหน

export const toGrade = (score) => {
  const criteria = [
    { min: 80, grade: 'A' }, { min: 75, grade: 'B+' }, { min: 70, grade: 'B' },
    { min: 65, grade: 'C+' }, { min: 60, grade: 'C' }, { min: 55, grade: 'D+' },
    { min: 50, grade: 'D' }, { min: 0, grade: 'F' },
  ];
  return criteria.find((c) => score >= c.min).grade;
};

export const isPassing = (score) => score >= 50;

export const summarize = (students) => ({
  total: students.length,
  passed: students.filter((s) => isPassing(s.score)).length,
  average: students.length
    ? Number((students.reduce((sum, s) => sum + s.score, 0) / students.length).toFixed(2))
    : 0,
});