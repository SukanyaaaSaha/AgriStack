import React from "react";

interface StringValueProps {
  value: string;
}

export const StringValue: React.FC<StringValueProps> = ({ value }) => {
  return <div>{value}</div>;
};

interface ObjectValueProps {
  value: object;
}

export const ObjectValue: React.FC<ObjectValueProps> = ({ value }) => {
  // Render the object properties however you want
  return (
    <div>
      {Object.entries(value).map(([key, val]) => (
        <div key={key}>
          <strong>{key}:</strong> {val}
        </div>
      ))}
    </div>
  );
};

interface ArrayValueProps {
  value: any[];
}

export const ArrayValue: React.FC<ArrayValueProps> = ({ value }) => {
  // Render array elements however you want
  return (
    <div>
      {value.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
