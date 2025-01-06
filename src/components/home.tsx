import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";
import Model from "./model";
import EditModel from "./editModel";
import DeleteModel from "./deleteModel"; // Import the DeleteModel component
import edit from '../assets/edit.png';
import trash from '../assets/trash.png'; // Assume you have a delete/trash icon
import Navbar from "./navbar";
interface TableRows {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
}

const Table: React.FC = () => {
    const [tableData, setTableData] = useState<TableRows[]>([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [editData, setEditData] = useState<TableRows | null>(null);
    const [deleteData, setDeleteData] = useState<TableRows | null>(null);

    const fetchTableData = async () => {
        try {
            const response = await axios.get("/api/users");
            setTableData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleModelOpen = () => {
        setIsModelOpen(true);
    };

    const handleModelClose = () => {
        setIsModelOpen(false);
    };

    const handleEditModelOpen = (row: TableRows) => {
        setEditData(row);
        setIsEditModelOpen(true);
    };

    const handleEditModelClose = () => {
        setEditData(null);
        setIsEditModelOpen(false);
    };

    const handleDeleteModelOpen = (row: TableRows) => {
        setDeleteData(row);
        setIsDeleteModelOpen(true);
    };

    const handleDeleteModelClose = () => {
        setDeleteData(null);
        setIsDeleteModelOpen(false);
    };

    const handleSubmit = (data: { name: string; model: string; brand: string; year: number }) => {
        axios.post("/api/add", data)
            .then(() => {
                fetchTableData(); // Refresh table data
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
            });
    };

    const handleEditSubmit = async (data: TableRows) => {
        try {
            await axios.put(`/api/edit/${data.id}`, data);
            setTableData((prev) =>
                prev.map((item) => (item.id === data.id ? data : item))
            );
            handleEditModelClose();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleDelete = async () => {
        if (!deleteData) return;

        try {
            await axios.delete(`/api/delete/${deleteData.id}`);
            setTableData((prev) =>
                prev.filter((item) => item.id !== deleteData.id)
            );
            handleDeleteModelClose();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        fetchTableData(); // Fetch initial table data
    }, []);

    return (

  <>
  
 <Navbar/>
 
<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <h2 className="text-center mt-6 font-semibold text-2xl text-red-500 dark:text-red-400">Card Data</h2>
    <div className="flex justify-center items-center mt-4">
        <Button onClick={handleModelOpen}/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {tableData.map((row) => (
            <div
                key={row.id}
                className="card bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800 dark:text-white transition-transform hover:scale-105"
            >
                <div className="card-header flex justify-between items-center mb-4 border-b pb-2 border-gray-300 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">ID: {row.id}</h3>
                    <div className="actions flex space-x-4">
                        <img
                            src={edit}
                            alt="Edit"
                            onClick={() => handleEditModelOpen(row)}
                            className="h-6 w-6 cursor-pointer hover:scale-110 transform transition"
                        />
                        <img
                            src={trash}
                            alt="Delete"
                            onClick={() => handleDeleteModelOpen(row)}
                            className="h-6 w-6 cursor-pointer hover:scale-110 transform transition"
                        />
                    </div>
                </div>
                <div className="card-body space-y-2">
                    <p className="text-sm"><span className="font-semibold">Brand:</span> {row.brand}</p>
                    <p className="text-sm"><span className="font-semibold">Name:</span> {row.name}</p>
                    <p className="text-sm"><span className="font-semibold">Model:</span> {row.model}</p>
                    <p className="text-sm"><span className="font-semibold">Year:</span> {row.year}</p>
                </div>
            </div>
        ))}
    </div>

    {/* Edit Modal */}
    {isEditModelOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg ">
                <EditModel
                    isOpen={isEditModelOpen}
                    onClose={handleEditModelClose}
                    onSubmit={handleEditSubmit}
                    initialData={editData}
                />
            </div>
        </div>
    )}

    {/* Add Modal */}
    {isModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <Model
                    isOpen={isModelOpen}
                    onClose={handleModelClose}
                    onSubmit={handleSubmit}
                    refreshTable={fetchTableData}
                />
            </div>
        </div>
    )}

    {/* Delete Modal */}
    {isDeleteModelOpen && deleteData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <DeleteModel
                    isOpen={isDeleteModelOpen}
                    onClose={handleDeleteModelClose}
                    onConfirm={handleDelete}
                    data={deleteData}
                />
            </div>
        </div>
    )}
</div>
</>

 

    );
};

export default Table;
