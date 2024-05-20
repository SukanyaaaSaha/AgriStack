import styled from "@emotion/styled";
import { Box, Grid, Typography, Table } from "@mui/material";

export const ResultsSummaryContainer = styled(Box)(
  ({ success }: { success: boolean }) => ({
    height: "340px",
    backgroundColor: success ? "#4B9D1F" : "#CB4242",
    color: "white",
  })
);

export const VcDisplayCardContainer = styled(Box)(
  ({
    cardPositioning,
  }: {
    cardPositioning: { top?: number; right?: number };
  }) => ({
    margin: "0 auto",
    top: cardPositioning.top ?? 212,
    right: cardPositioning.right ?? 0,
    // position: "absolute"
  })
);

export const VcDisplay = styled(Box)`
  width: calc(min(800px, 90vw));
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 5px 15px;
  box-shadow: 0 3px 15px #0000000f;
  //   max-height: 320px;
  overflow-y: hidden;
`;
export const Template = styled(Grid)`
  width: calc(min(700px, 90vw));
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 5px 15px;
  overflow-y: hidden;
`;
export const VcTable = styled(Table)`
  width: 2000px;
  --bs-table-bg: #f8f9fa;
  col-width: 600px;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  th,
  td {
    padding: 8px; /* Add padding to table cells */
    text-align: center; /* Align text to the left */
    white-space: nowrap;
  }
  th {
    background-color: #f0f0f0; /* Background color for table header */
    font: normal normal normal 11px/14px Inter;
  }
  td {
    font: normal normal 600 12px/15px Inter;
  }
`;
export const VcProperty = styled(Grid)`
  padding: 10px 4px;
`;

export const VcPropertyKey = styled(Typography)`
  font: normal normal normal 11px/14px Inter;
  margin-bottom: 4px;
`;

export const VcPropertyValue = styled(Typography)`
  font: normal normal 600 12px/15px Inter;
`;

export const VcVerificationFailedContainer = styled(Box)`
  display: grid;
  place-content: center;
  width: 100%;
  height: 320px;
  color: rgb(0, 0, 0, 0.1);
  font-size: 100px;
`;
export const CodeBox = styled(Box)`
  height: "300px";
  overflow: "auto";
`;
