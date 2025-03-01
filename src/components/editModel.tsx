import React from "react";

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    images?: File[];
    existingImages?: string[];
  }) => void;
  initialData: {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    image?: string[];
  };
}

const EditModel: React.FC<EditModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = React.useState({
    ...initialData,
    images: [] as File[],
    existingImages: initialData.image || [],
  });

  const [newImagePreviews, setNewImagePreviews] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFormData({
      ...initialData,
      images: [],
      existingImages: initialData.image || [],
    });
    setNewImagePreviews([]);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: filesArray,
      }));

      const previewUrls = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setNewImagePreviews(previewUrls);
    }
  };

  // Remove existing image from the array
  const handleRemoveExistingImage = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== imageUrl),
    }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Pass the updated data to Home.tsx
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Edit Entry</h3>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand:</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year:</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          {/* Display Existing Images with Remove Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Existing Images:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.existingImages.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Existing Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    onClick={() => handleRemoveExistingImage(imageUrl)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Display New Image Previews */}
          <div>
            <label className="block text-sm font-medium text-gray-700">New Images:</label>
            <input
              type="file"
              name="image"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {newImagePreviews.map((previewUrl, index) => (
                <img
                  key={index}
                  src={previewUrl}
                  alt={`New Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
