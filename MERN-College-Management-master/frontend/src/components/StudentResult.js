import React, { Component } from 'react';
import { api } from '../services/api.js';
import './StudentResult.css';

class StudentResult extends Component {
  constructor() {
    super();
    this.state = {
      registrationId: '',
      studentData: null,
      error: null,
      cgpa: null,
      name: '', 
      branch: '',
      totalCredits: 0, 
      totalSubCredits: 0,
    };
  }

  handleRegistrationIdChange = (event) => {
    this.setState({ registrationId: event.target.value });
  };

  handleFetchData = async () => {
    const { registrationId } = this.state;
  
    try {
      const response = await api.get(`/api/students/${registrationId}`);
      const studentData = response.data;
      const { name, branch } = studentData;
  
      this.setState({
        studentData,
        name,
        branch,
        error: null,
      });
  
      // Calculate CGPA and other details
      this.calculateDetails(studentData);
    } catch (error) {
      this.setState({
        studentData: null,
        cgpa: null,
        name: '',
        branch: '',
        totalCredits: 0,
        totalSubCredits: 0,
        error: 'Student not found or server error',
      });
    }
  };
  

  calculateDetails = (data) => {
    let totalCredits = 0;
    let totalSubCredits = 0;
    let earnedCredits = 0;

    data.forEach((row) => {
      const subjectCredits = parseFloat(row.subjectCredits);
      const grade = row.grade;

      switch (grade) {
        case 'Ex':
          earnedCredits = subjectCredits * 10;
          break;
        case 'A':
          earnedCredits = subjectCredits * 10 - subjectCredits;
          break;
        case 'B':
          earnedCredits = subjectCredits * 10 - 2 * subjectCredits;
          break;
        case 'C':
          earnedCredits = subjectCredits * 10 - 3 * subjectCredits;
          break;
        case 'D':
          earnedCredits = subjectCredits * 10 - 4 * subjectCredits;
          break;
        case 'E':
          earnedCredits = subjectCredits * 10 - 5 * subjectCredits;
          break;
        case 'R':
          earnedCredits = 0;
          break;
        default:
          earnedCredits = 0;
      }

      totalSubCredits += subjectCredits;
      totalCredits += earnedCredits;
    });

    // Update the state with the calculated values
    if (totalSubCredits > 0) {
      const cgpa = (totalCredits / totalSubCredits).toFixed(3);
      this.setState({ cgpa, totalCredits, totalSubCredits });
    }
  };

  renderStudentData() {
    const { studentData, cgpa, totalCredits, totalSubCredits } = this.state;

    if (studentData && studentData.length > 0) {
      return (
        <div className="container mt-3">
          <div className="custom-card custom-container shadow">
            <div className="card-body">
              <h2 className="text-center">R19 E2S1 Results</h2>

              <form action="" method="post">
                <div className="form-group row">
                  <label htmlFor="registration_id" className="col-sm-2 col-form-label">Enter Your ID:</label>
                  <div className="col-sm-4">
                    <input type="text" className="form-control" id="registration_id" name="registration_id" required value={this.state.registrationId} onChange={this.handleRegistrationIdChange} />
                  </div>
                  <div className="col-sm-6">
                    <button className="btn btn-primary" type="button" onClick={this.handleFetchData}>Fetch Data</button>
                  </div>
                </div>
              </form>
              <div className='row'>
                <label htmlFor="inputName" className="col-sm-2 col-form-label font-weight-bold">Name:</label>
                <div className="col">
                  <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-input" id="inputName" value={studentData[0] ? studentData[0].name : ''} disabled />
                </div>
                <label htmlFor="inputBranch" className="col-sm-2 col-form-label font-weight-bold">Branch:</label>
                <div className="col">
                  <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-input" id="inputBranch" value={studentData[0] ? studentData[0].branch : ''} disabled />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered m-2 custom-table">
                  <thead>
                    <tr align="center">
                      <th>Subject Name</th>
                      <th>Subject Credits</th>
                      <th>YoP</th>
                      <th>AT-1</th>
                      <th>AT-2</th>
                      <th>ATs(BOA)</th>
                      <th>MID-1</th>
                      <th>MID-2</th>
                      <th>MID-3</th>
                      <th>Mid(BOM)</th>
                      <th>Internal</th>
                      <th>Grade</th>
                      <th>Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student) => (
                      <tr key={student._id} align="center">
                        <td align="left">{student.subjectName}</td>
                        <td>{student.subjectCredits}</td>
                        <td>{student.yearOfPassing}</td>
                        <td>{student.at1}</td>
                        <td>{student.at2}</td>
                        <td>{student.at3}</td>
                        <td>{student.mid1}</td>
                        <td>{student.mid2}</td>
                        <td>{student.mid3}</td>
                        <td>{student.midInternals}</td>
                        <td>{student.totalInternals}</td>
                        {student.grade === 'R' ? (
                          <td className="grade-red">{student.grade}</td>
                        ) : (
                          <td>{student.grade}</td>
                        )}
                        <td>{student.batch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="form">
                {this.state.cgpa && (
                  <div className='row'>
                    <label htmlFor="inputName" className="col-sm-2 col-form-label font-weight-bold">ID No:</label>
                    <div className="col-sm-4">
                      <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-input" id="inputName" value={this.state.registrationId} disabled />
                    </div>
                    
                    <label htmlFor="inputTotalCredits" className="col-sm-2 col-form-label font-weight-bold">Obtained Credits:</label>
                    <div className="col-sm-4">
                      <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-input" id="inputTotalCredits" value={totalCredits} disabled />
                    </div>
                    <label htmlFor="inputTotalSubCredits" className="col-sm-2 col-form-label font-weight-bold">Total Credits:</label>
                    <div className="col-sm-4">
                      <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-input" id="inputTotalSubCredits" value={totalSubCredits} disabled />
                    </div>
                    <label htmlFor="inputCGPA" className="col-sm-2 col-form-label font-weight-bold">CGPA:</label>
                    <div className="col-sm-4">
                      <input type="text" style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px' }} className="form-control custom-cgpa custom-input" id="inputCGPA" value={cgpa} disabled />
                    </div>
                  </div>
                )}
              </div>
              <p className="note"><b>Note: BOM(Best of 1 Mids) Grade Point: Ex-->10; A-->9; B-->8; C-->7; D-->6; E-->5; R-->0</b></p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    const { error } = this.state;

    return (
      <div className="container mt-3">
        <div className="text-right">
        </div>
        <h1 className="text-center">Student Results</h1>
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Enter RegId"
              className='btn-dark ml-3'
              value={this.state.registrationId}
              onChange={this.handleRegistrationIdChange}
            />
            <div className="input-group-append">
              <submit className="btn btn-primary" onClick={this.handleFetchData}>
                Fetch Data
              </submit>
            </div>
          </div>
        </div>
        {this.renderStudentData()}
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
}

export default StudentResult;
