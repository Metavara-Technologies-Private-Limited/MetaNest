import ResidentsHeader from "./ResidentsHeader";
import ResidentFilters from "./ResidentFilters";
import ResidentSearch from "./ResidentSearch";
import ResidentsTable from "./ResidentsTable";

const ResidentsPage = () => {
  return (
    <div
      style={{
        background: "#F5F7FB",
        minHeight: "100vh",
        padding: "32px",
      }}
    >
      <ResidentsHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <ResidentFilters />

        <ResidentSearch />
      </div>

      {/* Table comes here */}

      <div
      style={{
        marginTop: "24px",
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
      }}
    >
      <ResidentsTable />
    </div>
    </div>
  );
};

export default ResidentsPage;