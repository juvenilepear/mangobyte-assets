import React, { useState, useEffect } from "react";
import componentsData from "../componentsData.json";

const ComponentList = ({ onSelect }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const filteredComponents = componentsData.filter(
      (item) => item.type === "component"
    );
    setComponents(filteredComponents);
  }, []);

  return (
    <div>
      <h2>Components</h2>
      <ul>
        {components.map((component) => (
          <li
            key={component.name}
            onClick={() => onSelect(component)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            <strong>{component.name}</strong>: {component.info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
