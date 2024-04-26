const mongoose = require('mongoose');

const studentResultSchema = new mongoose.Schema({
  branch: String,            // BRANCH
  registrationId: String,    // Reg.Id
  name: String,              // Name
  academicYear: String,      // AY
  year: String,              // YEAR
  semester: String,          // Semester
  courseCode: String,        // Course Code
  subjectName: String,       // Subject Name
  subjectCredits: Number,    // SUBJECT_CREDITS
  at1: String,               // AT1
  at2: String,               // AT2
  ats: String,               // ATs
  mid1: String,              // MID1
  mid2: String,              // MID2
  mid3: String,              // MID3
  midInternals: String,      // Mid Internals
  totalInternals: String,    // Total Internals
  grade: String,            // GRADE
  yearOfPassing: String,     // YoP
  batch: String              // Batch
});

module.exports = mongoose.model('StudentResult', studentResultSchema);
