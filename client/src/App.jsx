import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const apiUrl = 'https://curly-succotash-g4rxxwjw597jh7v-5000.app.github.dev/api/students';

  const fetchStudents = async () => {
    try {
      const res = await fetch(apiUrl);
      setStudents(await res.json());
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    fetchStudents(); 
    setFormData({ studentId: '', name: '', email: '' }); 
  };

  // Câu 62: Hàm Xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      fetchStudents();
    }
  };

  // Câu 61: Hàm Cập nhật sinh viên (Sửa tên)
  const handleUpdate = async (id, oldName) => {
    const newName = window.prompt('Nhập tên mới cho sinh viên:', oldName);
    if (newName && newName !== oldName) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      fetchStudents();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Sinh Viên (MERN Stack)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="MSSV" required value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} />
        <input type="text" placeholder="Họ tên" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ margin: '0 10px' }} />
        <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <button type="submit" style={{ marginLeft: '10px' }}>Thêm</button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr><th>MSSV</th><th>Họ tên</th><th>Email</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleUpdate(student._id, student.name)} style={{ marginRight: '5px' }}>Sửa</button>
                <button onClick={() => handleDelete(student._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;