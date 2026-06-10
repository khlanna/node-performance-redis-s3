export default function BlogField({ label, name, register, error }) {
  return (
    <div className={name}>
      <label>{label}</label>
      <input
        {...register(name, { required: "You must provide a value" })}
        style={{ marginBottom: "5px" }}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {error?.message}
      </div>
    </div>
  );
}
