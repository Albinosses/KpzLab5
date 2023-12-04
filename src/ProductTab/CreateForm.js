import React, { useState } from "react";

const CreateForm = ({ onCreate }) => {
    const [newItem, setNewItem] = useState({ name: "", size: "", color: "" });

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newItem);
        setNewItem({ name: "", size: "", color: "" });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Name:</label>
                <input type="text" name="name" value={newItem.name} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Size:</label>
                <input type="number" name="size" value={newItem.size} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: "space-between" }}>
                <label>Color:</label>
                <input type="text" name="color" value={newItem.color} onChange={handleChange} required />
            </div>

            <button type="submit">Create</button>
        </form>
    );
};

export default CreateForm;
