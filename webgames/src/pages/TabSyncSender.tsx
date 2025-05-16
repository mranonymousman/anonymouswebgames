import { useMemo, useState } from "react";

const COLORS = [
  { name: "Red", value: "#FF0000" },
  { name: "Green", value: "#00FF00" },
  { name: "Blue", value: "#0000FF" },
  { name: "Yellow", value: "#FFFF00" },
];

const TabSyncSender = () => {
  const [lastSent, setLastSent] = useState<string | null>(null);
  const channel = useMemo(() => new BroadcastChannel("color-sync"), []);

  const sendColor = (color: string, colorName: string) => {
    channel.postMessage({ color });
    setLastSent(colorName);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Color Sender</h1>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p>Send the correct sequence of colors to complete the challenge.</p>
        <p>Required sequence: Red → Blue → Yellow → Green</p>
        <p>Make sure you have the receiver tab open in another window!</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        {COLORS.map(({ name, value }) => (
          <button
            key={name}
            onClick={() => sendColor(value, name)}
            style={{
              padding: "15px",
              background: value,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: ["Yellow", "Green"].includes(name) ? "#000" : "#fff",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Send {name}
          </button>
        ))}
      </div>

      {lastSent && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#666",
          }}
        >
          Last sent: {lastSent}
        </div>
      )}
    </div>
  );
};

export default TabSyncSender;
