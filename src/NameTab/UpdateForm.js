import React, {useEffect, useState} from "react";

const UpdateForm = ({ onUpdate, selectedItem, onCancel }) => {
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
                <input type="text" name="user_name" value={updatedItem.user_name} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Surname:</label>
                <input type="text" name="user_surname" value={updatedItem.user_surname} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Age:</label>
                <input type="number" name="user_age" value={updatedItem.user_age} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <button type="submit">Update</button>
            </div>
        </form>
    );
};

export default UpdateForm;
