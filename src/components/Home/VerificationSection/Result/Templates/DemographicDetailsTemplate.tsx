import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  VcDisplay,
  VcProperty,
  VcPropertyKey,
  VcPropertyValue,
  VcVerificationFailedContainer,
  Template,
} from "../styles";
import { convertToTitleCase, getDisplayValue } from "../../../../../utils/misc";

interface DemographicDetailsTemplateProps {
  value: any;
}

const DemographicDetailsTemplate: React.FC<DemographicDetailsTemplateProps> = ({
  value,
}) => {
  // Render demographic details however you want
  return (
    <Template container>
      {value
        ? Object.keys(value).map((key) => (
            <VcProperty item xs={12} lg={6} key={key}>
              <VcPropertyKey>{convertToTitleCase(key)}</VcPropertyKey>
              <VcPropertyValue>{getDisplayValue(value[key])}</VcPropertyValue>
            </VcProperty>
          ))
        : null}
    </Template>
  );
};

export default DemographicDetailsTemplate;
