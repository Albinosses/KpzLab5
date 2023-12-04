import React, {useEffect, useState} from "react";

const UpdateForm = ({ onUpdate, selectedItem }) => {
    const [updatedItem, setUpdatedItem] = useState(selectedItem);

    useEffect(() => {
        setUpdatedItem(selectedItem);
    }, [selectedItem]);

    const handleChange = (e) => {
        setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedItem);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Name:</label>
                <input type="text" name="name" value={updatedItem.name} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Size:</label>
                <input type="number" name="size" value={updatedItem.size} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Color:</label>
                <input type="text" name="color" value={updatedItem.color} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <button type="submit">Update</button>
            </div>
        </form>
    );
};

export default UpdateForm;
