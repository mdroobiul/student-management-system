'use client'

export default function StudentForm({formData, setFromData, handeSubmit, editid, setEditId, loading}){

    const handleChange = (e) => {
        setFromData({...FormData, [e.target.name]: e.target.value})
    }

    return(
        <>
        <form onSubmit={handeSubmit} className=" bg-white p-6 rounded-xl shadow-md mb-8 border border-g-10 ">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{editId ? '✏️ Edit Student' : '➕ Add New Student'} </h2>

            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className=" block text-sm font-medium text-gray-700 mb-1"> Name </label>
                        <input type="text" name="name" value={FormData.name} onChange={handleChange} required 
                        className=" w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Enter Name:" />
                </div>
            </div>

            <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1"> Email </label>
                    <input type="email" name="email"  value={FormData.email} onChange={handleChange} required
                    className=" w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Enter Email" />
            </div>

            <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1"> Phone </label>
                    <input type="text" name="phone" value={FormData.phone} onChange={handleChange} required
                    className=" w-full px-3 py-2 border  border-gray-300 rounded-lg text-gray-400" placeholder="Enter Phone Number" />
            </div>

            <div>
                <label className=" block text-ms font-medium text-gray-700 mb-1"> Deparment </label>
                <input type="text" name="deparment" value={FormData.deparment} onChange={handleChange} required
                className=" w-full px-2 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Enter Deparment" />
            </div>

            <div className="mt-6 flex gap-4">
                <button type="submit" disabled={loading} className=" px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 cursor-pointer">
                    {loading ? 'saving...' : editid ? 'Update Student' : 'Add Student'}
                </button>

                {editid && (
                    <button type="button" onClick={()=>{setEditId(null); setFormData ({name: '', phone:'', deparment:''})}} 
                    className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 cursor-pointer">
                        Cancel
                    </button>
                )}
            </div>
            

        </form>
        </>
    )
}