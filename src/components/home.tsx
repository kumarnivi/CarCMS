import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";
import Model from "./model";
import EditModel from "./editModel";
import DeleteModel from "./deleteModel"; // Import the DeleteModel component
import edit from '../assets/edit.png';
import trash from '../assets/trash.png'; // Assume you have a delete/trash icon
import { toast, ToastContainer } from "react-toastify";
import { Car, Tag, Calendar } from "lucide-react";
import SerchResult from "../pages/SearchResults"


interface TableRows {
    image: string[]
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
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const fetchTableData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            setTableData(response.data.reverse());
            console.log(response.data, ':Data');
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

    const handleSubmit = async (data: { name: string; model: string; brand: string; year: number }) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("model", data.model);
            formData.append("brand", data.brand);
            formData.append("year", data.year.toString());
            selectedFiles.forEach((file) => formData.append("image", file)); // Append each file
    
            await axios.post("http://localhost:8080/api/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            fetchTableData();
            toast.success("Created Successfully");
        } catch (error) {
            toast.error("Permission Denide");
            console.error("Error submitting form:", error);
        }
    };


 
    const handleEditSubmit = async (updatedData:any) => {
        try {
            const formData = new FormData();
            formData.append("name", updatedData.name);
            formData.append("brand", updatedData.brand);
            formData.append("model", updatedData.model);
            formData.append("year", updatedData.year.toString());
    
            // Append existing images as strings
            updatedData.existingImages.forEach((img:any) => formData.append("image", img));
    
            // Append new images as files
            updatedData.images.forEach((file:any) => formData.append("image", file));
    
            await axios.put(`http://localhost:8080/api/edit/${updatedData.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            fetchTableData();
            handleEditModelClose();
            toast.success("Data updated successfully!");
        } catch (error) {
            toast.error("Error updating data");
            console.error("Error updating data:", error);
        }
    };
    
    
    

    const handleDelete = async () => {
        if (!deleteData) return;

        try {
            await axios.delete(`http://localhost:8080/api/delete/${deleteData.id}`);
            setTableData((prev) =>
                prev.filter((item) => item.id !== deleteData.id)
            );
            handleDeleteModelClose();
            toast.info('Deleted!')
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        fetchTableData(); // Fetch initial table data
    }, []);

    const getCurrentImage = (images: string[] | undefined) => {
        if (images && images.length > 0) {
            return images[currentImageIndex % images.length];
        }
        return null;
    };
   

    return (

  <>
<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="p-5 text-right">
        <Button onClick={handleModelOpen} />
    </div>

    <div>
        <SerchResult/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-8">
    {tableData.map((row) => (
        <div
            key={row.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden dark:bg-gray-800 dark:text-white transform transition-transform hover:scale-105 hover:shadow-2xl"
            style={{ height: '450px' }}
        >
            <div className="relative h-2/4 overflow-hidden">
                {row.image && row.image.length > 0 ? (
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        src={getCurrentImage(row.image) || ""}
                        alt="Car Image"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No images available
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-4 flex flex-col justify-between h-2/4">
                <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{row.name}</p>

                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Tag className="h-4 w-4 text-blue-500" />
                        <span>{row.brand}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Car className="h-4 w-4 text-green-500" />
                        <span>{row.model}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span>{row.year}</span>
                    </div>
                </div>

                <div className="actions flex justify-end space-x-4 mt-4">
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
