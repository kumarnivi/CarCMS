import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";
import Model from "./model";
import EditModel from "./editModel";

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
    const [editData, setEditData] = useState<TableRows | null>(null)


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
        setEditData(row)
        setIsEditModelOpen(true);
    }

    const handleEditModelClose = () => {
        setEditData(null)
        setIsEditModelOpen(false);
    }

   

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

    useEffect(() => {
        fetchTableData(); // Fetch initial table data
    }, []);

    return (
        <div>

            <h2 className="text-center mt-6 font-semibold text-xl text-red-500">Table Data</h2>
            <div className="flex justify-center items-center bg-gray-100">
                <Button onClick={handleModelOpen} />

            </div>

            <div className="table-container relative overflow-x-auto shadow-md sm:rounded-lg mt-6 ml-7 mr-7 z-0">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Brand</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Model</th>
                            <th scope="col" className="px-6 py-3">Year</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row) => (
                            <tr
                                key={row.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {row.id}
                                </th>
                                <td className="px-6 py-4">{row.brand}</td>
                                <td className="px-6 py-4">{row.name}</td>
                                <td className="px-6 py-4">{row.model}</td>
                                <td className="px-6 py-4">{row.year}</td>
                                <td className="px-6 py-4">
                                    <button  className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEditModelOpen(row)} >Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* edit */}
                {isEditModelOpen && editData && (
                    <EditModel
                        isOpen={isEditModelOpen}
                        onClose={handleEditModelClose}
                        onSubmit={handleEditSubmit}
                        initialData={editData}
                    />
                )}

                {isModelOpen && (
                    <>
                        <div className="modal-backdrop"></div>
                        <div className="model">
                            <Model
                                isOpen={isModelOpen}
                                onClose={handleModelClose}
                                onSubmit={handleSubmit}
                                refreshTable={fetchTableData} // Pass refreshTable function
                            />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Table;
