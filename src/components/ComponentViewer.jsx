import React, { useState, useEffect } from "react";

const ComponentViewer = ({ selectedItem }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (selectedItem && selectedItem.location) {
      fetch(selectedItem.location)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((text) => setCode(text))
        .catch(() => setCode("// Unable to load code"));
    } else {
      setCode("");
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return <div>Please select a component or template to view details.</div>;
  }

  return (
    <div>
      <h2>{selectedItem.name}</h2>
      <p>{selectedItem.explanation}</p>
      <h3>Code:</h3>
      <pre
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
          maxHeight: "400px",
        }}
      >
        {code}
      </pre>
    </div>
  );
};

export default ComponentViewer;
