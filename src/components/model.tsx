import React from "react";
import './model.css';

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; brand: string; model: string; year: number }) => void;
  refreshTable: () => void; // New prop for refreshing the table
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

    // Ensure all fields are valid before submitting
    if (formData.name && formData.brand && formData.model && formData.year) {
      try {
        const response = await fetch("/api/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data successfully sent to the backend:", data);
          alert("Data submitted successfully!");
          onClose();
          refreshTable(); // Refresh the table after successful submission
          setFormData({
            name: "",
            brand: "",
            model: "",
            year: 0,
          });
        } else {
          const error = await response.json();
          console.error("Error from server:", error);
          alert("Failed to submit data. Please try again.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("An error occurred while submitting the data. Please try again.");
      }
    } else {
      alert("Please fill out all fields before submitting!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter the brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Enter the model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter the year"
              value={formData.year || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
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


