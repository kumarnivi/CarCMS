import React from "react";
import "./model.css";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; brand: string; model: string; year: number }) => void;
  refreshTable: () => void; // Refresh table data after submission
}

const Model: React.FC<ModelProps> = ({ isOpen, onClose, onSubmit, refreshTable }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    brand: "",
    model: "",
    year: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.brand && formData.model && formData.year) {
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Data submitted successfully!");
          onClose();
          refreshTable();
          setFormData({ name: "", brand: "", model: "", year: 0 });
        } else {
          const error = await response.json();
          alert(`Submission failed: ${error.message}`);
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Add New Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the brand"
                required
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the model"
                required
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the year"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
