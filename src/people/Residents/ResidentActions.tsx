import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ResidentActions = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
      }}
    >
      <EditOutlinedIcon
        sx={{ cursor: "pointer", color: "#64748B", fontSize: 20 }}
      />

      <DeleteOutlineOutlinedIcon
        sx={{ cursor: "pointer", color: "#64748B", fontSize: 20 }}
      />
    </div>
  );
};

export default ResidentActions;