import ProductTable from "../components/ProductTable";
import { status } from "../utils/warranty";

function WarrantyStatus({
  products, filter, setFilter, edit, remove
}) {
  const filteredProducts = products.filter(
    p => filter === "All" || status(p) === filter
  );

  return (
    <>
      <h2>Warranty Status</h2>

      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Active</option>
        <option>Expiring Soon</option>
        <option>Expired</option>
      </select>

      <section>
        <ProductTable
          items={filteredProducts}
          edit={edit}
          remove={remove}
        />
      </section>
    </>
  );
}

export default WarrantyStatus;