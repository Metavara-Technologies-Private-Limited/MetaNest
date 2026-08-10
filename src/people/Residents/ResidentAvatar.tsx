interface Props {
  name: string;
}

const ResidentAvatar = ({ name }: Props) => {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#EEF2FF",
        color: "#4F46E5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      {name.charAt(0)}
    </div>
  );
};

export default ResidentAvatar;