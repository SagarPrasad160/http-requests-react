import { useState } from "react";

function AddMovie({ addMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
        />
        <textarea id="openingText" onChange={handleChange} />
        <label htmlFor="releaseDate">Release Date</label>
        <input id="releaseDate" onChange={handleChange} />
        <button type="submit"> Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
