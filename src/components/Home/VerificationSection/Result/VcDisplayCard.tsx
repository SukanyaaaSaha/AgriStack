import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CodeBlock } from "react-code-blocks";
import { convertToTitleCase, getDisplayValue } from "../../../../utils/misc";
import StyledButton from "../commons/StyledButton";
import { SAMPLE_VERIFIABLE_CREDENTIAL } from "../../../../utils/samples";
import { SetActiveStepFunction } from "../../../../types/function-types";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { VerificationSteps } from "../../../../utils/config";
import {
  VcDisplay,
  VcProperty,
  VcPropertyKey,
  VcPropertyValue,
  VcVerificationFailedContainer,
} from "./styles";
import DemographicDetailsTemplate from "./Templates/DemographicDetailsTemplate";
import LandDetailsTemplate from "./Templates/LandDetailsTemplate";
import CropDetailsTemplate from "./Templates/CropDetailsTemplate";
const propertyOrder = [
  "farmerId",
  "farmerDemoGraphicDetails",
  "farmerLandDetails",
  "farmerCropDetails",
  "issuanceDate",
  "disclaimer",
];
function VcDisplayCard({
  vc,
  setActiveStep,
}: {
  vc: any;
  setActiveStep: SetActiveStepFunction;
}) {
  return (
    <Box>
      <VcDisplay>
        {vc ? (
          propertyOrder.map(
            (key) =>
              vc.credentialSubject[key] !== undefined && (
                <VcProperty item xs={12} lg={6} key={key}>
                  <VcPropertyKey>{convertToTitleCase(key)}</VcPropertyKey>
                  {typeof vc.credentialSubject[key] === "string" ? (
                    <VcPropertyValue>
                      {getDisplayValue(vc.credentialSubject[key])}
                    </VcPropertyValue>
                  ) : key === "farmerDemoGraphicDetails" ? (
                    <DemographicDetailsTemplate
                      value={vc.credentialSubject[key]}
                    />
                  ) : key === "farmerLandDetails" ? (
                    <LandDetailsTemplate value={vc.credentialSubject[key]} />
                  ) : key === "farmerCropDetails" ? (
                    <CropDetailsTemplate value={vc.credentialSubject[key]} />
                  ) : (
                    <VcPropertyValue>
                      {JSON.stringify(vc.credentialSubject[key], null, 2)}
                    </VcPropertyValue>
                  )}
                </VcProperty>
              )
          )
        ) : (
          // Object.keys(vc.credentialSubject)
          //   .filter(
          //     (key) =>
          //       key?.toLowerCase() !== "id" && key?.toLowerCase() !== "type"
          //   )
          //   .map((key) => (
          //     <VcProperty item xs={12} lg={6} key={key}>
          //       <VcPropertyKey>{convertToTitleCase(key)}</VcPropertyKey>
          //       {typeof vc.credentialSubject[key] === "string" ? (
          //         <VcPropertyValue>
          //           {getDisplayValue(vc.credentialSubject[key])}
          //         </VcPropertyValue>
          //       ) : (
          //         <VcPropertyValue>
          //           {JSON.stringify(vc.credentialSubject[key], null, 2)}
          //         </VcPropertyValue>
          //       )}
          //     </VcProperty>
          //   ))
          <VcVerificationFailedContainer>
            <DescriptionOutlinedIcon fontSize={"inherit"} color={"inherit"} />
          </VcVerificationFailedContainer>
        )}
        {/* <CodeBox>
          <CodeBlock
            text={JSON.stringify(vc.credentialSubject, null, 2)}
            language="typescript"
            showLineNumbers={true}
            wrapLongLines={true}
          ></CodeBlock>
        </CodeBox> */}
      </VcDisplay>
      <Box
        style={{
          display: "grid",
          placeContent: "center",
        }}
      >
        <StyledButton
          style={{ margin: "24px auto" }}
          onClick={() => {
            setActiveStep(VerificationSteps.ScanQrCodePrompt);
          }}
        >
          Scan Another QR Code
        </StyledButton>
      </Box>
    </Box>
  );
}

export default VcDisplayCard;
