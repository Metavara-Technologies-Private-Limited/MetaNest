import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

const ResidentSearch = () => {
  return (
    <TextField
      placeholder="Search name or flat..."
      size="small"
      sx={{
        width: 320,
        background: "#fff",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ResidentSearch;