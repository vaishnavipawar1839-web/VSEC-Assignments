function ProductForm({ form, setForm, save, editing }) {
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={save} className="form">
      <input
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={change}
        required
      />

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={change}
        required
      />

      <select name="category" value={form.category} onChange={change}>
        <option>Electronics</option>
        <option>Home Appliances</option>
        <option>Mobile Phones</option>
        <option>Accessories</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        name="purchaseDate"
        value={form.purchaseDate}
        onChange={change}
        required
      />

      <input
        type="number"
        name="purchasePrice"
        placeholder="Price (₹)"
        min="0"
        value={form.purchasePrice}
        onChange={change}
        required
      />

      <select
        name="warrantyMonths"
        value={form.warrantyMonths}
        onChange={change}
      >
        <option value="0">No Warranty</option>
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="12">1 Year</option>
        <option value="24">2 Years</option>
        <option value="36">3 Years</option>
        <option value="60">5 Years</option>
      </select>

      <input
        name="serialNumber"
        placeholder="Serial Number (optional)"
        value={form.serialNumber}
        onChange={change}
      />

      <button>
        {editing ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;