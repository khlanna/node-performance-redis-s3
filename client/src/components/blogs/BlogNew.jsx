import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import BlogForm from "./BlogForm";
import BlogFormReview from "./BlogFormReview";

export default function BlogNew() {
  const [showFormReview, setShowFormReview] = useState(false);
  const methods = useForm({ defaultValues: { title: "", content: "" } });

  return (
    <FormProvider {...methods}>
      {showFormReview ? (
        <BlogFormReview onCancel={() => setShowFormReview(false)} />
      ) : (
        <BlogForm onBlogSubmit={() => setShowFormReview(true)} />
      )}
    </FormProvider>
  );
}
