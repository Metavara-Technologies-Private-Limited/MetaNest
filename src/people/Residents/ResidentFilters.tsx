import { Button } from "@mui/material";

const ResidentFilters = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: "25px",
          textTransform: "none",
        }}
      >
        All (9)
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderRadius: "25px",
          textTransform: "none",
        }}
      >
        Owner (7)
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderRadius: "25px",
          textTransform: "none",
        }}
      >
        Tenant (2)
      </Button>
    </div>
  );
};

export default ResidentFilters;