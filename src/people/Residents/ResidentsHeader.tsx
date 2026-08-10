import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ResidentsHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: 700,
            color: "#172554",
          }}
        >
          Resident Management
        </h1>

        <p
          style={{
            color: "#64748B",
            marginTop: "8px",
          }}
        >
          9 Registered
        </p>
      </div>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#4F46E5",
          textTransform: "none",
          borderRadius: "14px",
          px: 3,
          py: 1.3,
          fontWeight: 600,
        }}
      >
        Add Resident
      </Button>
    </div>
  );
};

export default ResidentsHeader;