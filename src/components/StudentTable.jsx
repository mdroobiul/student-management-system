'use client'

export default function studentTable ({ student, handleEdit, handleData}) {
    return(
        <>
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 ">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 "> 📋 Student Records</h3>
                </div>


            <div className="overflow-auto">
                <table>
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold">
                            <th className="py-3 px-4"> Name</th>
                            <th className="py-3 px-4"> Email</th>
                            <th className="py-3 px-4"> Phone</th>
                            <th className="py-3 px-4"> Deperment</th>
                            <th className="py-3 px-4 text-center"> Actions</th>
                        </tr>
                    </thead>

                    <tbody className=" divide-y divide-gray-200 text-sm text-gray-500">
                        {student.length === 0 ? (
                            <tr>
                                <td colSpan="5" > No records found.</td>
                            </tr>
                        ): (
                            students.map((student)=>(
                                <tr key={student._id} className="hover:bg-gray-50">
                                    <td className=" py-3 px-4 font-medium text-gray-900">{student.name}</td>
                                    <td className=" py-3 px-4">{student.email}</td>
                                    <td className=" py-3 px-4">{student.phone}</td>
                                    <td className=" py-3 px-4">{student.deparment}</td>
                                    <td className=" py-3 px-4 text-center space-x-2">
                                        <button onClick={()=> handleEdit(student)} 
                                        className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded hover:bg-amber-600 cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={()=> handleDelete(student._id)} 
                                        className=" px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded hover:bg-rose-600 cursor-pointer">
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>
        
        </>
    )
}