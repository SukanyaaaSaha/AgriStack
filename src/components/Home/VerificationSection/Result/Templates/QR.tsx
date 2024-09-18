import React from "react";

import {
  Template,
  VcDisplay,
  VcProperty,
  VcPropertyKey,
  VcPropertyValue,
  VcTable,
} from "../styles";
import { convertToTitleCase, getDisplayValue } from "../../../../../utils/misc";

interface QRProps {
  value: any;
}

const QR: React.FC<QRProps> = ({ value }) => {
  // Render demographic details however you want
  return (
    <Template container>
      {value &&
        value.map((asset: any, index: number) => (
          <div key={index}>
            <p>DVC QR</p>
            <VcPropertyValue></VcPropertyValue>
            <img src={asset.qrUrl}></img>
          </div>
        ))}

      {/* <VcTable>
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
      </VcTable> */}
    </Template>
  );
};

export default QR;
