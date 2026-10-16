import ProductTable from "../components/ProductTable";
import { status } from "../utils/warranty";

function Dashboard({ products, edit, remove }) {
  const active = products.filter(
    p => status(p) === "Active"
  ).length;

  const expiring = products.filter(
    p => status(p) === "Expiring Soon"
  ).length;

  const expired = products.filter(
    p => status(p) === "Expired"
  ).length;

  return (
    <>
      <h2>Dashboard</h2>

      <div className="cards">
        <div>Total Products <h2>{products.length}</h2></div>
        <div>Active Warranties <h2>{active}</h2></div>
        <div>Expiring Soon <h2>{expiring}</h2></div>
        <div>Expired Warranties <h2>{expired}</h2></div>
      </div>

      <section>
        <h2>Recent Products</h2>
        <ProductTable
          items={products.slice(0, 5)}
          edit={edit}
          remove={remove}
        />
      </section>
    </>
  );
}

export default Dashboard;