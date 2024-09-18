import React from "react";
import { IconButton } from "@mui/material";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { PopUpContainer, AssetPopUp, AssetDetails } from "../styles"; // Assuming these are your styled components

interface AssetDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  assetDetails: any;
}

const AssetDetailsPopup: React.FC<AssetDetailsPopupProps> = ({
  open,
  onClose,
  assetDetails,
}) => {
  return (
    <Popup modal open={open} onClose={onClose}>
      <PopUpContainer>
        <AssetPopUp>
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <div className="mb-2">
            <h2 className="text-center fs-10 fw-medium text-black-secondary">
              Asset Details
            </h2>
            <div className="card shadow bg-body-tertiary rounded">
              {assetDetails.assetType === "LAND" && (
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Farm Id:</div>
                    <div className="col col-5">{assetDetails.assetData1}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">
                      Survey Number:
                    </div>
                    <div className="col col-5">{assetDetails.assetData2}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Village:</div>
                    <div className="col col-5">{assetDetails.assetData3}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Sub-District:</div>
                    <div className="col col-5">{assetDetails.assetData4}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">District:</div>
                    <div className="col col-5">{assetDetails.assetData5}</div>
                  </div>
                </div>
              )}
              {assetDetails.assetType === "CROP" && (
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Farm Id:</div>
                    <div className="col col-5">{assetDetails.assetData1}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Year:</div>
                    <div className="col col-5">{assetDetails.assetData2}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Season:</div>
                    <div className="col col-5">{assetDetails.assetData3}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Crop Name:</div>
                    <div className="col col-5">{assetDetails.assetData4}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col col-5 me-2 text-end">Area Sown:</div>
                    <div className="col col-5">{assetDetails.assetData5}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <div>
            <h2>Asset Details</h2>
            <p>{assetDetails.assetData1}</p>
            <p>{assetDetails.assetData2}</p>
          </div> */}
        </AssetPopUp>
      </PopUpContainer>
    </Popup>
  );
};

export default AssetDetailsPopup;
