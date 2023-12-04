import React, { useState } from "react";

const CreateForm = ({ onCreate }) => {
    const [newItem, setNewItem] = useState({ user_name: "", user_surname: "", user_age: "" });

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newItem);
        setNewItem({ user_name: "", user_surname: "", user_age: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="user_name" value={newItem.user_name} onChange={handleChange} required />

            <label>Surname:</label>
            <input type="text" name="user_surname" value={newItem.user_surname} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="user_age" value={newItem.user_age} onChange={handleChange} required />

            <button type="submit">Create</button>
        </form>
    );
};

export default CreateForm;
