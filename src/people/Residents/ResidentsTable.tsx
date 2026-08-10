import { residents } from "./residentData";
import ResidentRow from "./ResidentRow";
const ResidentsTable = () => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#F8FAFC",
            textAlign: "left",
          }}
        >
          <th style={{ padding: "18px" }}>Name</th>
          <th>Type</th>
          <th>Flat</th>
          <th>Phone</th>
          <th>Move In</th>
          <th>Family</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
  {residents.map((resident) => (
    <ResidentRow
      key={resident.id}
      resident={resident}
    />
  ))}
</tbody>
    </table>
  );
};

export default ResidentsTable;