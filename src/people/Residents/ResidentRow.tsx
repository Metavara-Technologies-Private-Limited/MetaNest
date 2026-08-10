import ResidentAvatar from "./ResidentAvatar";
import ResidentStatus from "./ResidentStatus";
import ResidentActions from "./ResidentActions";
import { Resident } from "./types";

interface Props {
  resident: Resident;
}

const ResidentRow = ({ resident }: Props) => {
  return (
    <tr
      style={{
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <td style={{ padding: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <ResidentAvatar name={resident.name} />
          <span style={{ fontWeight: 600 }}>{resident.name}</span>
        </div>
      </td>

      <td>
        <span
          style={{
            background:
              resident.type === "Owner" ? "#EEF2FF" : "#FEF3C7",
            color:
              resident.type === "Owner" ? "#4338CA" : "#B45309",
            padding: "6px 12px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {resident.type}
        </span>
      </td>

      <td>{resident.flat}</td>

      <td>{resident.phone}</td>

      <td>{resident.moveIn}</td>

      <td>{resident.family}</td>

      <td>
        <ResidentStatus status={resident.status} />
      </td>

      <td>
        <ResidentActions />
      </td>
    </tr>
  );
};

export default ResidentRow;