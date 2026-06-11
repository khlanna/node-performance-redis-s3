import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import formFields from "./formFields";
import { useApp } from "../../context/AppContext";

export default function BlogFormReview({ onCancel }) {
  const { getValues } = useFormContext();
  const { submitBlog } = useApp();
  const navigate = useNavigate();
  const formValues = getValues();
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await submitBlog(formValues, imageFile);
    navigate("/blogs");
  };

  return (
    <form onSubmit={onSubmit}>
      <h5>Please confirm your entries</h5>
      {formFields.map(({ name, label }) => (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      ))}
      <h5>Add an Image</h5>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageFile && (
        <p>
          Selected: {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
        </p>
      )}
      <div>
        <button
          type="button"
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button type="submit" className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    </form>
  );
}
