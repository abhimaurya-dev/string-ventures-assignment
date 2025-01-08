import React, { useState } from "react";

const AddForm = ({ onAddBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(formData);
    setFormData({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      image: "",
    });
  };

  return (
    <form
      className="p-4 bg-base-100 shadow-lg rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4">Add New Book</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Author</span>
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Genre</span>
        </label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Published Year</span>
        </label>
        <input
          type="number"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image URL</span>
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Add Book
      </button>
    </form>
  );
};

export default AddForm;
