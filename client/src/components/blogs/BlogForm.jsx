import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import BlogField from "./BlogField";
import formFields from "./formFields";

export default function BlogForm({ onBlogSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onBlogSubmit)}>
      {formFields.map(({ label, name }) => (
        <BlogField
          key={name}
          label={label}
          name={name}
          register={register}
          error={errors[name]}
        />
      ))}
      <Link to="/blogs" className="red btn-flat white-text">
        Cancel
      </Link>
      <button type="submit" className="teal btn-flat right white-text">
        Next
        <i className="material-icons right">done</i>
      </button>
    </form>
  );
}
