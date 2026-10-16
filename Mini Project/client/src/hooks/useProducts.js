
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/products";

const emptyForm = {
  productName: "",
  brand: "",
  category: "",
  purchaseDate: "",
  purchasePrice: "",
  warrantyMonths: "",
  serialNumber: ""
};

export default function useProducts(setTab) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // GET: Database se products fetch karna
  async function load() {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Products not load ");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // POST: Naya product | PUT: Existing product update
  async function save(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Save failed");
      }

      setMessage(
        editId
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      setForm(emptyForm);
      setEditId(null);

      await load();
      setTab("My Products");
    } catch (err) {
      setError(err.message);
    }
  }

  // Edit button click hone par form fill karna
  function edit(product) {
    setForm({
      ...product,
      purchaseDate: product.purchaseDate
        ? new Date(product.purchaseDate).toISOString().slice(0, 10)
        : ""
    });

    setEditId(product._id);
    setTab("Add Product");
  }

  // DELETE: Database se product delete karna
  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setMessage("Product deleted successfully!");
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  // Add Product tab open karna
  function addNew() {
    setForm(emptyForm);
    setEditId(null);
    setMessage("");
    setError("");
    setTab("Add Product");
  }

  function cancelEdit() {
    setForm(emptyForm);
    setEditId(null);
    setTab("My Products");
  }

  return {
    products,
    form,
    setForm,
    editId,
    search,
    setSearch,
    filter,
    setFilter,
    message,
    error,
    load,
    save,
    edit,
    remove,
    addNew,
    cancelEdit
  };
}
