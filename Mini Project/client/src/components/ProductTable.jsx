import { endDate, status } from "../utils/warranty";

function ProductTable({ items, edit, remove }) {
  if (!items.length) return <p>No products found.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Purchase Date</th>
            <th>Warranty Ends</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map(p => (
            <tr key={p._id}>
              <td>{p.productName}</td>
              <td>{p.brand}</td>
              <td>
                {new Date(p.purchaseDate).toLocaleDateString("en-IN")}
              </td>
              <td>{endDate(p).toLocaleDateString("en-IN")}</td>
              <td>
                <span
                  className={
                    "status " +
                    status(p).toLowerCase().replace(" ", "-")
                  }
                >
                  {status(p)}
                </span>
              </td>
              <td>
                <button type="button" onClick={() => edit(p)}>
                  Edit
                </button>

                <button
                  type="button"
                  className="delete"
                  onClick={() => remove(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;