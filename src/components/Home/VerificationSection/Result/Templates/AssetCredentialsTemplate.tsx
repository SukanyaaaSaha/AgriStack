import React, { useEffect, useState, useRef, useCallback } from "react";
import Popup from "reactjs-popup";
import Tooltip from "@mui/material/Tooltip";
import Home from "./AssetDVC/AssetDVCVerification";
import AssetDVCVerification from "./AssetDVC/AssetDVCVerification";
import { Box, IconButton } from "@mui/material";
import { verify } from "../../../../../utils/verification-utils";
import {
  Template,
  VcTable,
  PopUpContainer,
  PopUpScanner,
  AssetButton,
  AssetPopUp,
} from "../styles";
// import { convertToTitleCase, getDisplayValue } from "../../../../../utils/misc";
import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/UndoRounded";
import { decodeQrData } from "../../../../../utils/qr-utils";
import ScanQrCode from "../../ScanQrCode";
import { SetScanResultFunction } from "../../../../../types/function-types";
import { QrScanResult, ScanStatus } from "../../../../../types/data-types";
import { ReactComponent as VerificationSuccessIcon } from "../../../../../assets/verification-success-icon.svg";
import { Buffer } from "buffer";
import { useAlertMessages } from "../../../../../pages/Home";
import { AlertMessages, VerificationSteps } from "../../../../../utils/config";
import AssetDetailsPopup from "./AssetDetailsPopUp";
import QrScanner from "../../QrScanner";
import { useActiveStepContext } from "../../../../../pages/Home"; // Import useActiveStepContext

// import { handleDownload } from "../../../../../utils/qr-utils";

interface AssetCredentialsTemplateProps {
  value: any;
  assetHash: string;
}

const AssetCredentialsTemplate: React.FC<AssetCredentialsTemplateProps> = ({
  value,
  assetHash,
}) => {
  const [scanStatus, setScanStatus] = useState<"Success" | "Failed" | null>(
    null
  );
  const [scanResult, setScanResult] = useState<{ data: any; error: any }>({
    data: null,
    error: null,
  });
  const { getActiveStep, setActiveStep } = useActiveStepContext();
  const [verifierFlag, setVerifierFlag] = useState(Array(5).fill(false));
  const [notReqFlag, setNotReqFlag] = useState(Array(5).fill(false));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [assetPopUp, setAssetPopUp] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const { setAlertInfo } = useAlertMessages();
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("OutPuit Of Scan: ", scanResult);
    if (scanResult.data) {
      const processScanResult = async () => {
        try {
          console.log("Inside useEffect - scanResult: " + scanResult.data);
          const decodedData = await decodeQrData(scanResult.data);
          if (!decodedData) {
            console.error("Failed to decode QR data. Decoded data is null.");
            setScanStatus("Failed");
            return;
          }

          let vc;
          try {
            vc = JSON.parse(decodedData);
          } catch (e) {
            console.error("Error parsing JSON from decoded data: ", e);
            setScanStatus("Failed");
            return;
          }
          console.log("VC: ", vc);
          const status = await verify(vc);
          if (status && vc.id === value[currentIndex].credentialId) {
            console.log("handle before verify asset");
            await verifyAsset(vc.id, assetHash, currentIndex);
            console.log("the selected one: ", selectedAsset);
            setScanResult({ data: null, error: null });
            return vc.credentialSubject;
          } else {
            console.error("VC ID does not match credential ID.");
            setScanStatus("Failed");
            setAlertInfo({ ...AlertMessages.incorrectAssetQR, open: true });
          }
        } catch (error) {
          console.error("Error processing QR code:", error);
          setScanStatus("Failed");
        } finally {
          setIsPopupOpen(false);
          console.log("the selected two: ", selectedAsset);
        }
      };

      processScanResult();
    }
  }, [scanResult, currentIndex, value, assetHash, selectedAsset]);

  const verifyAsset = async (
    credentialId: string,
    assetHash: string,
    index: number
  ) => {
    console.log("CredentialId: ", credentialId, " AssetHash: ", assetHash);
    const assetHash2 =
      "Wkdsa09uSmpkenBtTWpCaE1XRmhOUzFtTVRkakxUUmlOR1F0WVRRek5pMHpZekJrTlRreE9UVTNNalE9fApaR2xrT25KamR6cGhabVkwTm1JeFpTMWhOVFl6TFRRNVpEWXRZakZsWmkwM05ERTVPRFJtTTJRMU9UST18ClpHbGtPbkpqZHpveVpUSXlNVGt4T0MxaVpXWmlMVFEyTURRdFltUm1NQzB5TURjeE1XUTFZbUl3WmpZPXwKWkdsa09uSmpkenBrWXpjNVlXRXpaQzB5TVdNd0xUUmxaVEV0T0dZeE1TMDRPR1kyTTJaaFlqVXhNRGs9fApaR2xrT25KamR6cGhNVFUzWVdaallTMDJOekUyTFRSbFlqVXRZV0ppWkMxaE56ZGxNalZqTTJFMlpqYz0=";
    const encodedBuffer = Buffer.from(credentialId, "utf-8").toString("base64");
    const decodedBuffer = Buffer.from(assetHash, "base64").toString("utf-8");
    console.log("Encoded Buffer: ", encodedBuffer);
    console.log("decoded Buffer: ", decodedBuffer);
    if (decodedBuffer.includes(encodedBuffer)) {
      console.log("verified Index: ", index);
      updateVerifierFlag(index, true);
      console.log("Verifier Flag: ", verifierFlag);
    }
  };
  function updateVerifierFlag(index: number, newValue: boolean) {
    const updatedFlag = [...verifierFlag];
    updatedFlag[index] = newValue;
    console.log("inside updateVerifierFlag: ", updatedFlag, " index: ", index);
    setVerifierFlag(updatedFlag);
  }
  function handleLinkClick(asset: any) {
    setSelectedAsset(asset);
    setAssetPopUp(true);
  }
  function handleQrData(data: string) {
    setScanResult({ data, error: null });
  }

  // async function handleScanClick(result: QrScanResult, index: number) {
  //   try {
  //     console.log("Inside handleScanClick: " + result.data);
  //     setScanResult(result);
  //     setIsPopupOpen(false);
  //     decodeQrData(scanResult.data).then((data) => {
  //       let vc = JSON.parse(data);
  //       console.log("VC: ", vc);
  //       // TODO: is it a vc? - check format
  //       verify(vc)
  //         .then((status: any) => {
  //           console.log("Handle Status: ", vc);
  //         })
  //         .catch((error: { code: any }) => {
  //           console.error("Error occurred while verifying the VC: ", error);
  //           console.error("Error code: ", error.code);
  //           return;
  //         })
  //         .finally(() => {
  //           console.log(
  //             "credentialId: ",
  //             value[index].credentialId,
  //             " index :",
  //             index,
  //             "result.data: ",
  //             result.data
  //           );
  //           if (vc.id === value[index].credentialId) {
  //             console.log("handle before verify asset");
  //             verifyAsset(vc.id, assetHash, index);
  //             setScanResult({ data: null, error: null });
  //           }
  //         });
  //     });
  //   } catch (error) {
  //     console.error("Error scanning QR code:", error);
  //     setScanStatus("Failed"); // Indicate scan failure
  //     // Handle error appropriately (e.g., display error message to user)
  //   }
  // }
  const setNotReq = async (index: number, newValue: boolean) => {
    setNotReqFlag((prevFlags) => [
      ...prevFlags.slice(0, index),
      newValue,
      ...prevFlags.slice(index + 1),
    ]);
    console.log("NotReq Flag: ", notReqFlag);
  };

  // Render demographic details however you want
  return (
    <Template container>
      {/* {isPopupOpen && <BlurBackground />} */}
      <Box>
        <VcTable>
          <thead>
            <tr>
              <th>DVC Type</th>
              <th>Scan</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {value &&
              value.map((asset: any, index: number) => (
                <tr key={index}>
                  <td style={{ height: 131 }}>
                    Asset {index + 1} <br />
                    {asset.assetType}
                  </td>
                  <td>
                    {verifierFlag[index] && <VerificationSuccessIcon />} <br />
                    {!(verifierFlag[index] || notReqFlag[index]) && (
                      // <Popup
                      //   trigger={
                      <div style={{ padding: 10 }}>
                        <AssetButton
                          variant="contained"
                          disabled={
                            !(
                              index === 0 ||
                              verifierFlag[index - 1] ||
                              notReqFlag[index - 1]
                            )
                          }
                          onClick={() => {
                            console.log("Index of this asset : ", index);
                            setCurrentIndex(index);
                            setIsPopupOpen(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Scan this Asset
                        </AssetButton>

                        <Popup modal open={isPopupOpen && !assetPopUp}>
                          <PopUpContainer ref={popupRef}>
                            <PopUpScanner>
                              <IconButton
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                }}
                                onClick={() => setIsPopupOpen(false)}
                              >
                                <CloseIcon />
                              </IconButton>
                              {/* <QrScanner
                                setQrData={(data: string) => {
                                  setScanResult({ data, error: null });
                                }}
                                setActiveStep={setActiveStep}
                              /> */}
                              <ScanQrCode setScanResult={setScanResult} />
                            </PopUpScanner>
                          </PopUpContainer>
                        </Popup>
                      </div>
                    )}
                    {!(
                      verifierFlag[index] ||
                      notReqFlag[index] ||
                      index === 0
                    ) && (
                      <AssetButton
                        variant="contained"
                        disabled={
                          !(
                            index === 0 ||
                            verifierFlag[index - 1] ||
                            notReqFlag[index - 1]
                          )
                        }
                        onClick={() => setNotReq(index, true)}
                        style={{ cursor: "pointer" }}
                      >
                        Not Required
                      </AssetButton>
                    )}
                  </td>
                  <td>
                    {verifierFlag[index] && (
                      <div style={{ color: "green" }}>
                        {asset.assetData1}
                        <br /> {asset.assetData2}
                        <br />
                        {asset.assetData3}{" "}
                        <div>
                          <a
                            href="#"
                            onClick={() => handleLinkClick(asset)}
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    )}
                    {notReqFlag[index] && (
                      <div>
                        <div>Marked Not Required</div>
                        <div>
                          <Tooltip title="Undo">
                            <IconButton
                              className="hoverI"
                              onClick={() => setNotReq(index, false)}
                            >
                              <UndoIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </VcTable>
        {assetPopUp && selectedAsset && (
          <AssetDetailsPopup
            open={assetPopUp}
            onClose={() => setAssetPopUp(false)}
            assetDetails={selectedAsset}
          />
        )}
      </Box>
    </Template>
  );
};

export default AssetCredentialsTemplate;
