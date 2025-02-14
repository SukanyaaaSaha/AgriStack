import React, { createContext, useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import VerificationProgressTracker from "../components/Home/VerificationProgressTracker";
import VerificationSection from "../components/Home/VerificationSection";
import Copyrights from "../components/Home/VerificationProgressTracker/Copyrights";
import { VerificationSteps } from "../utils/config";
import { AlertInfo } from "../types/data-types";
import AlertMessage from "../components/commons/AlertMessage";
import { SetAlertInfoFunction } from "../types/function-types";
import Navbar from "../components/Home/VerificationProgressTracker/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

let activeStep: number = 0;
const setActiveStep = (newValue: number) => {
  activeStep = newValue;
};
const getActiveStep = () => activeStep;
const ActiveStepContext = createContext({ getActiveStep, setActiveStep });
export const useActiveStepContext = () => useContext(ActiveStepContext);

let alert: AlertInfo = { open: false };
let setAlertInfo: React.Dispatch<React.SetStateAction<AlertInfo>> = (
  value
) => {};
const AlertsContext = createContext({ alertInfo: alert, setAlertInfo });
export const useAlertMessages = () => useContext(AlertsContext);

function Home(props: any) {
  const [activeStep, setActiveStep] = useState(
    VerificationSteps.ScanQrCodePrompt
  );
  const getActiveStep = () => activeStep;

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    severity: "success",
    message: "",
  } as AlertInfo);

  return (
    <AlertsContext.Provider value={{ alertInfo, setAlertInfo }}>
      <ActiveStepContext.Provider value={{ getActiveStep, setActiveStep }}>
        <Navbar />
        <Grid container>
          {/* <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            xl={2}
            style={{ background: "#FAFBFD 0 0 no-repeat padding-box" }}
          >
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={2}
              style={{
                background: "#FAFBFD 0 0 no-repeat padding-box",
              }}
            >
              <VerificationProgressTracker />
            </Grid>
          </Grid> */}
          {/* <Grid
            item
            xs={12}
            md={6}
            style={{ background: "#FAFBFD 0 0 no-repeat padding-box" }}
          > */}
          <Grid item xs={12} md={12} lg={12}>
            <VerificationSection />
          </Grid>
        </Grid>
        {/* </Grid> */}
        <Copyrights />
        <AlertMessage
          alertInfo={alertInfo}
          handleClose={() => {
            setAlertInfo({ ...alertInfo, open: false });
          }}
        />
      </ActiveStepContext.Provider>
    </AlertsContext.Provider>
  );
}

export default Home;
