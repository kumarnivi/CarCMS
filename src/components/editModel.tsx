import React from "react";


interface EditModelProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data:{ name:string;brand:string;model:string;year:number}) => void;
   initialData: { id: number; name: string; brand: string; model: string; year: number };

}


const EditModel: React.FC<EditModelProps> = ({isOpen, onClose, onSubmit, initialData}) => {
   const [formData, setFormData] =  React.useState(initialData);

   React.useEffect(() => {
    setFormData(initialData)
   }, [initialData])
 


 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
        ...prev,  
        [name] : name === 'year' ? parseInt(value): value,
    }));
}


const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
};
if(!isOpen) return null;

return (
    <div className="modal">
    <div className="modal-content">
      <form onSubmit={handleEditSubmit}>
        <h3>Edit Entry</h3>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={formData.year} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  </div>
)

}

export default EditModel;

