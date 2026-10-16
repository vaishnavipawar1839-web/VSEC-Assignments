import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000/api/products";
const empty = {
  productName: "", brand: "", category: "Electronics",
  purchaseDate: "", purchasePrice: "", warrantyMonths: "12",
  serialNumber: ""
};

function endDate(p) {
  const d = new Date(p.purchaseDate);
  d.setMonth(d.getMonth() + Number(p.warrantyMonths));
  return d;
}

function status(p) {
  const days = Math.ceil((endDate(p) - new Date()) / 86400000);
  if (days < 0) return "Expired";
  if (days <= 30) return "Expiring Soon";
  return "Active";
}

function ProductForm({ form, setForm, save, editing }) {
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={save} className="form">
      <input name="productName" placeholder="Product Name" value={form.productName} onChange={change} required />
      <input name="brand" placeholder="Brand" value={form.brand} onChange={change} required />

      <select name="category" value={form.category} onChange={change}>
        <option>Electronics</option>
        <option>Home Appliances</option>
        <option>Mobile Phones</option>
        <option>Accessories</option>
        <option>Other</option>
      </select>

      <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={change} required />
      <input type="number" name="purchasePrice" placeholder="Price (₹)" min="0" value={form.purchasePrice} onChange={change} required />

      <select name="warrantyMonths" value={form.warrantyMonths} onChange={change}>
        <option value="0">No Warranty</option>
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="12">1 Year</option>
        <option value="24">2 Years</option>
        <option value="36">3 Years</option>
        <option value="60">5 Years</option>
      </select>

      <input name="serialNumber" placeholder="Serial Number (optional)" value={form.serialNumber} onChange={change} />

      <button>{editing ? "Save Changes" : "Add Product"}</button>
    </form>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("Dashboard");
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Read products from MongoDB
  async function load() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Could not load products");
      setProducts(await res.json());
      setError("");
    } catch {
      setError("Cannot connect. Start MongoDB and the backend.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Add or update a product
  async function save(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(editId ? `${API}/${editId}` : API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          purchasePrice: Number(form.purchasePrice),
          warrantyMonths: Number(form.warrantyMonths)
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      setForm(empty);
      setEditId(null);
      setTab("My Products");
      setMessage("Product saved successfully!");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  // Put selected product into the form
  function edit(p) {
    setForm({
      productName: p.productName,
      brand: p.brand,
      category: p.category,
      purchaseDate: new Date(p.purchaseDate).toISOString().slice(0, 10),
      purchasePrice: String(p.purchasePrice),
      warrantyMonths: String(p.warrantyMonths),
      serialNumber: p.serialNumber || ""
    });
    setEditId(p._id);
    setTab("Add Product");
  }

  // Delete selected product
  async function remove(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMessage("Product deleted!");
      setError("");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  // Filter products by name or brand
  const list = products.filter(p =>
    `${p.productName} ${p.brand} ${p.serialNumber || ""}`
      .toLowerCase().includes(search.toLowerCase())
  );

  const active = products.filter(p => status(p) === "Active").length;
  const expiring = products.filter(p => status(p) === "Expiring Soon").length;
  const expired = products.filter(p => status(p) === "Expired").length;

  // Display product records
  function table(items) {
    if (!items.length) return <p>No products found.</p>;

    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th><th>Brand</th><th>Purchase Date</th>
              <th>Warranty Ends</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td>{p.productName}</td>
                <td>{p.brand}</td>
                <td>{new Date(p.purchaseDate).toLocaleDateString("en-IN")}</td>
                <td>{endDate(p).toLocaleDateString("en-IN")}</td>
                <td><span className={"status " + status(p).toLowerCase().replace(" ", "-")}>{status(p)}</span></td>
                <td>
                  <button type="button" onClick={() => edit(p)}>Edit</button>
                  <button type="button" className="delete" onClick={() => remove(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Start a new product form
  function addNew() {
    setForm(empty);
    setEditId(null);
    setMessage("");
    setError("");
    setTab("Add Product");
  }

  return (
    <main className="container">
      <header>
        <div>
          <h1>Warranty Tracker</h1>
          <p>Manage your product warranties</p>
        </div>
        <button onClick={addNew}>+ Add Product</button>
      </header>

      <nav className="tabs">
        {["Dashboard", "My Products", "Add Product", "Warranty Status"].map(t =>
          <button key={t} className={tab === t ? "selected" : ""} onClick={() => {
            if (t === "Add Product") addNew();
            else { setTab(t); setMessage(""); setError(""); }
          }}>{t}</button>
        )}
      </nav>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {tab === "Dashboard" && <>
        <h2>Dashboard</h2>
        <div className="cards">
          <div>Total Products <h2>{products.length}</h2></div>
          <div>Active Warranties <h2>{active}</h2></div>
          <div>Expiring Soon <h2>{expiring}</h2></div>
          <div>Expired Warranties <h2>{expired}</h2></div>
        </div>
        <section><h2>Recent Products</h2>{table(products.slice(0, 5))}</section>
      </>}

      {tab === "My Products" && <>
        <h2>My Products</h2>
        <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <section>{table(list)}</section>
      </>}

      {tab === "Add Product" && <>
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        <section>
          <ProductForm form={form} setForm={setForm} save={save} editing={!!editId} />
          {editId && <button className="cancel" onClick={addNew}>Cancel</button>}
        </section>
      </>}

      {tab === "Warranty Status" && <>
        <h2>Warranty Status</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>All</option><option>Active</option>
          <option>Expiring Soon</option><option>Expired</option>
        </select>
        <section>{table(products.filter(p => filter === "All" || status(p) === filter))}</section>
      </>}

      <footer>VSEC Mini Project · Product Warranty Tracker</footer>
    </main>
  );
}

export default App;
