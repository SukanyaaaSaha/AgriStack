import React, { createContext, useContext, useState } from "react";
import { Grid } from "@mui/material";
// import VerificationProgressTracker from "../../../../VerificationProgressTracker";
import VerificationSection from "../../..";
import Copyrights from "../../../../VerificationProgressTracker/Copyrights";
import { VerificationSteps } from "../../../../../../utils/config";
import { AlertInfo } from "../../../../../../types/data-types";
import AlertMessage from "../../../../../commons/AlertMessage";

let activeStep: number = 0;
const setActiveStep = (newValue: number) => {
  activeStep = newValue;
};
const getActiveStep = () => activeStep;
const AssetActiveStepContext = createContext({ getActiveStep, setActiveStep });

// const ActiveStepContext = createContext({
//   activeStep: 0,
//   setActiveStep: (newValue: number) => {},
// });

export const useAssetActiveStepContext = () =>
  useContext(AssetActiveStepContext);

// const AlertsContext = createContext({
//   alertInfo: { open: false },
//   setAlertInfo: (value: any) => {},
// });

// export const useAlertMessages = () => useContext(AlertsContext);

function AssetDVCVerification(props: any) {
  const [activeStep, setActiveStep] = useState(
    VerificationSteps.ScanQrCodePrompt
  );

  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    open: false,
    severity: "success",
    message: "",
  });

  return (
    // <AlertsContext.Provider value={{ alertInfo, setAlertInfo }}>
    <AssetActiveStepContext.Provider value={{ getActiveStep, setActiveStep }}>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <VerificationSection />
        </Grid>
      </Grid>
      <Copyrights />
      <AlertMessage
        alertInfo={alertInfo}
        handleClose={() => {
          setAlertInfo({ ...alertInfo, open: false });
        }}
      />
    </AssetActiveStepContext.Provider>
    // </AlertsContext.Provider>
  );
}

export default AssetDVCVerification;
