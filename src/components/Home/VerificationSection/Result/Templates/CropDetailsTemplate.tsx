import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  Template,
  VcProperty,
  VcPropertyKey,
  VcPropertyValue,
  VcTable,
} from "../styles";
import { convertToTitleCase, getDisplayValue } from "../../../../../utils/misc";

interface CropDetailsTemplateProps {
  value: any;
}

const CropDetailsTemplate: React.FC<CropDetailsTemplateProps> = ({ value }) => {
  // Render demographic details however you want
  return (
    <Template container>
      <VcTable>
        <table>
          <thead>
            <tr>
              <th>Farm ID</th>
              <th>Crop Name</th>
              <th>Season</th>
              <th>Year</th>
              <th>Sown Area</th>
              <th>Sowing Date</th>
              <th>Irrigation Type</th>
            </tr>
          </thead>

          <tbody>
            {value &&
              value.map((crop: any, index: number) => (
                <tr key={index}>
                  <td>{crop.farmId}</td>
                  <td>{crop.cropName}</td>
                  <td>{crop.season}</td>
                  <td>{crop.year}</td>
                  <td>{crop.sownArea}</td>
                  <td>{crop.sowingDate}</td>
                  <td>{crop.irrigationType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </VcTable>
    </Template>
  );
};

export default CropDetailsTemplate;
