'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Users, Trash2, Edit2, Search, GraduationCap, Loader2, X } from 'lucide-react';

const PRESET_DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Business Administration',
  'Mechanical Engineering',
];

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit & Custom Department state
  const [editingId, setEditingId] = useState(null);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customDept, setCustomDept] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
  });

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const result = await res.json();
      if (result.success) {
        setStudents(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle Department Dropdown Change
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    if (value === 'Others') {
      setIsOtherSelected(true);
      setFormData({ ...formData, department: customDept });
    } else {
      setIsOtherSelected(false);
      setCustomDept('');
      setFormData({ ...formData, department: value });
    }
  };

  // Handle Custom Dept Input Change
  const handleCustomDeptChange = (e) => {
    const value = e.target.value;
    setCustomDept(value);
    setFormData({ ...formData, department: value });
  };

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Final department check
    const finalDepartment = isOtherSelected ? customDept : formData.department;
    const payload = { ...formData, department: finalDepartment };

    try {
      const url = editingId ? `/api/students/${editingId}` : '/api/students';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await res.json();
      if (result.success) {
        resetForm();
        fetchStudents();
      } else {
        alert(result.error || 'Operation failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset Form state
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', department: 'Computer Science' });
    setEditingId(null);
    setIsOtherSelected(false);
    setCustomDept('');
  };

  // Handle Edit Click
  const handleEdit = (student) => {
    setEditingId(student._id);
    const dept = student.department || 'Computer Science';
    
    // Check if department is in preset list
    if (PRESET_DEPARTMENTS.includes(dept)) {
      setIsOtherSelected(false);
      setCustomDept('');
    } else {
      setIsOtherSelected(true);
      setCustomDept(dept);
    }

    setFormData({
      name: student.name || '',
      email: student.email || '',
      phone: student.phone || '',
      department: dept,
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        fetchStudents();
      } else {
        alert(result.error || 'Failed to delete student');
      }
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  // Filter students by search
  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-indigo-500" />
              Student Management Portal
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage student records, enrollment, and profiles in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300 shadow-inner">
            <Users className="h-5 w-5 text-indigo-400" />
            <span className="font-semibold">{students.length}</span> Total Students
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form (Add / Edit) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  {editingId ? (
                    <>
                      <Edit2 className="h-5 w-5 text-amber-400" /> Edit Student
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 text-indigo-400" /> Add New Student
                    </>
                  )}
                </h2>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md transition"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="MD ..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="md@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="017xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
                  <select
                    value={isOtherSelected ? 'Others' : formData.department}
                    onChange={handleDepartmentChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
                  >
                    {PRESET_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                    <option value="Others">Others.!!</option>
                  </select>

                  {/* Custom Department Input Field */}
                  {isOtherSelected && (
                    <input
                      type="text"
                      required
                      placeholder="Enter custom department name..."
                      value={customDept}
                      onChange={handleCustomDeptChange}
                      className="w-full mt-2.5 bg-slate-950 border border-indigo-500/50 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition animate-fadeIn"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${
                    editingId
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                  }`}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    <>
                      <Edit2 className="h-4 w-4" /> Update Student
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" /> Save Student
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Table & Search */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
              />
            </div>

            {/* Table Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-12 text-slate-500 gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  <p className="text-sm">Loading records...</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center p-12 text-slate-500">
                  <p className="text-sm">No students found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold">Contact Info</th>
                        <th className="p-4 font-semibold">Department</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm">
                      {filteredStudents.map((student) => (
                        <tr key={student._id} className="hover:bg-slate-800/40 transition group">
                          <td className="p-4 font-medium text-slate-200">
                            {student.name}
                          </td>
                          <td className="p-4">
                            <div className="text-slate-300">{student.email}</div>
                            <div className="text-xs text-indigo-400 font-mono mt-0.5">{student.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                              {student.department || 'General'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleEdit(student)}
                                className="text-slate-400 hover:text-amber-400 transition p-1.5 rounded-lg hover:bg-slate-800"
                                title="Edit Student"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(student._id)}
                                className="text-slate-400 hover:text-red-400 transition p-1.5 rounded-lg hover:bg-slate-800"
                                title="Delete Student"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}