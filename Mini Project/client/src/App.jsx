
import { useState } from "react";
import useProducts from "./hooks/useProducts";

import Dashboard from "./pages/Dashboard";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import WarrantyStatus from "./pages/WarrantyStatus";

import "./App.css";

function App() {
  const [tab, setTab] = useState("Dashboard");

  const {
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
    save,
    edit,
    remove,
    addNew,
    cancelEdit
  } = useProducts(setTab);

  const pageProps = {
    products,
    onEdit: edit,
    onDelete: remove
  };

  return (
    <div className="app">
      <header>
        <h1>Product Warranty Tracker</h1>
        <p>Manage your products and warranties</p>
      </header>

      <nav>
        {["Dashboard", "My Products", "Add Product", "Warranty Status"].map(
          (item) => (
            <button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() =>
                item === "Add Product" ? addNew() : setTab(item)
              }
            >
              {item}
            </button>
          )
        )}
      </nav>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {tab === "Dashboard" && (
        <Dashboard {...pageProps} />
      )}

      {tab === "My Products" && (
        <MyProducts
          {...pageProps}
          search={search}
          setSearch={setSearch}
        />
      )}

      {tab === "Add Product" && (
        <AddProduct
          form={form}
          setForm={setForm}
          save={save}
          editing={Boolean(editId)}
          cancel={cancelEdit}
        />
      )}

      {tab === "Warranty Status" && (
        <WarrantyStatus
          {...pageProps}
          filter={filter}
          setFilter={setFilter}
        />
      )}

      <footer>
        Product Warranty Tracker
      </footer>
    </div>
  );
}

export default App;
