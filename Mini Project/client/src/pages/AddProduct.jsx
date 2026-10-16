
import ProductForm from "../components/ProductForm";

export default function AddProduct({
  form,
  setForm,
  save,
  editing,
  cancel
}) {
  return (
    <section>
      <h2>{editing ? "Edit Product" : "Add Product"}</h2>

      <ProductForm
        form={form}
        setForm={setForm}
        save={save}
        editing={editing}
      />

      {editing && (
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      )}
    </section>
  );
}
