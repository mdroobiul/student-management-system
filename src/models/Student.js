import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
  },
  department: {
    type: String,
    required: [true, 'Please provide a department.'],
  },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);