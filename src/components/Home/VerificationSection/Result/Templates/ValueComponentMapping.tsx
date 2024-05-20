import React from "react";
import { StringValue, ObjectValue, ArrayValue } from "./ValueComponents";

interface ValueComponentMapping {
  [key: string]: React.FC<any>;
}

const valueComponentMap: ValueComponentMapping = {
  string: StringValue,
  object: ObjectValue,
  array: ArrayValue,
};

export default valueComponentMap;
