import React from "react";

interface DeleteModelProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: { id: number; name: string };
}

const DeleteModel: React.FC<DeleteModelProps> = ({ isOpen, onClose, onConfirm, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete <span className="font-bold">{data.name}</span>?
                </p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModel;
