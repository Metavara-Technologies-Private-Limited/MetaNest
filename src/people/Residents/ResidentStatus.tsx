interface Props {
  status: string;
}

const ResidentStatus = ({ status }: Props) => {
  return (
    <span
      style={{
        background: "#DCFCE7",
        color: "#15803D",
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "13px",
      }}
    >
      {status}
    </span>
  );
};

export default ResidentStatus;