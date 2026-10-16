import ProductTable from "../components/ProductTable";

function MyProducts({ products, search, setSearch, edit, remove }) {
  const list = products.filter(p =>
    `${p.productName} ${p.brand} ${p.serialNumber || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <h2>My Products</h2>

      <input
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <section>
        <ProductTable
          items={list}
          edit={edit}
          remove={remove}
        />
      </section>
    </>
  );
}

export default MyProducts;