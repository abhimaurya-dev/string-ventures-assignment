import React, { useState } from "react";

const AddNewBookModal = ({ isOpen, onClose, onAddBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(formData);
    onClose(); // Close the modal after adding the book
    setFormData({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      image: null,
    });
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Book</h3>
        <form onSubmit={handleSubmit}>
          {/* Book Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Book Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter book title"
              className="input input-bordered"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              className="input input-bordered"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          {/* Genre */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              name="genre"
              placeholder="Enter genre"
              className="input input-bordered"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Published Year */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Published Year</span>
            </label>
            <input
              type="number"
              name="publishedYear"
              placeholder="Enter published year"
              className="input input-bordered"
              value={formData.publishedYear}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Book Cover</span>
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered"
              onChange={handleFileChange}
              required
            />
          </div> */}

          {/* Submit Button */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBookModal;
