import React, { useState, useEffect } from "react";
import componentsData from "../componentsData.json";

const TemplateList = ({ onSelect }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const filteredTemplates = componentsData.filter(
      (item) => item.type === "template"
    );
    setTemplates(filteredTemplates);
  }, []);

  return (
    <div>
      <h2>Templates</h2>
      <ul>
        {templates.map((template) => (
          <li
            key={template.name}
            onClick={() => onSelect(template)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            <strong>{template.name}</strong>: {template.info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
