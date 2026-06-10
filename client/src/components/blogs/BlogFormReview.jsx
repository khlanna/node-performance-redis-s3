import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import formFields from "./formFields";
import { useApp } from "../../context/AppContext";

export default function BlogFormReview({ onCancel }) {
  const { getValues } = useFormContext();
  const { submitBlog } = useApp();
  const navigate = useNavigate();
  const formValues = getValues();

  const onSubmit = async (event) => {
    event.preventDefault();
    await submitBlog(formValues);
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
