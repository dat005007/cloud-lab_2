import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  const fetchStudents = async () => {
    try {
      // LƯU Ý: Bạn cần thay thế chuỗi URL bên dưới bằng đường link thực tế 
      // của Backend (cổng 5000) trên Codespaces của bạn.
      const res = await fetch('https://curly-succotash-g4rxxwjw597jh7v-5000.app.github.dev/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://curly-succotash-g4rxxwjw597jh7v-5000.app.github.dev/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      fetchStudents(); 
      setFormData({ studentId: '', name: '', email: '' }); 
    } catch (error) {
      console.error('Lỗi thêm sinh viên:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Sinh Viên (MERN Stack)</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" placeholder="MSSV" required value={formData.studentId}
          onChange={(e) => setFormData({...formData, studentId: e.target.value})} 
        />
        <input 
          type="text" placeholder="Họ tên" required value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          style={{ margin: '0 10px' }}
        />
        <input 
          type="email" placeholder="Email" required value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Thêm</button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>MSSV</th><th>Họ tên</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;