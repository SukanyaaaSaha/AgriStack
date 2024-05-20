import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  Template,
  VcDisplay,
  VcProperty,
  VcPropertyKey,
  VcPropertyValue,
  VcTable,
} from "../styles";
import { convertToTitleCase, getDisplayValue } from "../../../../../utils/misc";

interface LandDetailsTemplateProps {
  value: any;
}

const LandDetailsTemplate: React.FC<LandDetailsTemplateProps> = ({ value }) => {
  // Render demographic details however you want
  return (
    <Template container>
      <VcTable>
        <table>
          <thead>
            <tr>
              <th>Farm ID</th>
              <th>Survey Number</th>
              <th>Village</th>
              <th>District</th>
              <th>Sub-District</th>
              <th>Area</th>
              <th>Land Use Classification</th>
            </tr>
          </thead>

          <tbody>
            {value &&
              value.map((land: any, index: number) => (
                <tr key={index}>
                  <td>{land.farmId}</td>
                  <td>{land.surveyNumber}</td>
                  <td>{land.village}</td>
                  <td>{land.district}</td>
                  <td>{land.subDistrict}</td>
                  <td>{land.area}</td>
                  <td>{land.landUseClassification}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </VcTable>
    </Template>
  );
};

export default LandDetailsTemplate;
