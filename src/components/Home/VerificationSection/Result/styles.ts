import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Typography,
  Table,
  ImageListItem,
  Button,
} from "@mui/material";

export const ResultsSummaryContainer = styled(Box)(
  ({ success }: { success: boolean }) => ({
    height: "340px",
    backgroundColor: success ? "#4B9D1F" : "#CB4242",
    color: "white",
  })
);

export const VcDisplayCardContainer = styled(Box)(
  ({
    cardpositioning,
  }: {
    cardpositioning: { top?: number; right?: number };
  }) => ({
    margin: "0 auto",
    top: cardpositioning.top ?? 350,
    right: cardpositioning.right ?? 0,
    // position: "absolute",
  })
);

export const VcDisplay = styled(Box)`
  width: calc(min(1000px, 90vw));
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 5px 15px;
  box-shadow: 0 3px 15px #0000000f;
  //   max-height: 320px;
  overflow-y: hidden;
`;
export const Template = styled(Grid)`
  width: calc(min(900px, 90vw));
  margin: auto;
  background: white;
  border-radius: 12px;
  padding: 5px 15px;
  overflow-y: hidden;
`;
export const VcTable = styled(Table)`
  width: 800px;
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

export const DVC = styled(ImageListItem)`
  width: 200px;
  height: 200px;
  //object-fit: cover;
`;

export const PopUpContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const AssetPopUp = styled(Box)`
  background-color: white;
  margin-top: 60px;
  margin-bottom: 60px;
  height: 40%;
  width: 40%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

export const AssetDetails = styled(Grid)`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const PopUpScanner = styled(Box)`
  background-color: white;
  margin-top: 60px;
  margin-bottom: 60px;
  height: 60%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;
export const BlurBackground = styled.div`
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const AssetButton = styled(Button)`
  width: 140px;
  height: 30px;
`;
