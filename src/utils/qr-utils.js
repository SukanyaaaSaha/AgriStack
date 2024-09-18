// import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
// import { decodeData } from "@mosip/pixelpass";
// import { HEADER_DELIMITER, SUPPORTED_QR_HEADERS } from "./config";
// import JSZip from "jszip";
// import { useState } from "react";

// export const CERTIFICATE_FILE = "certificate.json";

// export const scanFilesForQr = async (selectedFile) => {
//   let scanResult = { data: null, error: null };
//   console.log("Scan Files | selectedFile : ", selectedFile);
//   try {
//     scanResult.data = await scanFile(selectedFile);
//     console.log("ScanResult Data: ", scanResult.data);
//   } catch (e) {
//     console.log(e);
//     // Example Error Handling
//     if (e?.name === "InvalidPDFException") {
//       scanResult.error = "Invalid PDF";
//     } else if (e instanceof Event) {
//       scanResult.error = "Invalid Image";
//     } else {
//       scanResult.error = "Unknown error:" + e;
//     }
//   }
//   return scanResult;
// };

// export const fetchImageFromUrl = async (imageUrl) => {
//   let response = await fetch(imageUrl)
//     .then((response) => response.arrayBuffer())
//     .then((buffer) => new Blob([buffer], { type: "image/png" }));
//   console.log("Fetch Image : ", imageUrl, "response", response);
//   return response;
// };

// export const decodeQrData = async (qrData) => {
//   if (qrData) {
//     const zip = new JSZip();
//     // console.log("QR Data", qrData);

//     // return await zip.loadAsync(qrData).then((contents) => {
//     //   console.log("QRData contents : ", contents);
//     // });

//     let cont = await zip.loadAsync(qrData);
//     console.log(cont);

//     return await zip
//       .loadAsync(qrData)
//       .then((contents) => {
//         console.log("zip contents: ", contents);
//         return contents.files[CERTIFICATE_FILE].async("text");
//       })
//       .then(function (contents) {
//         // setResult(contents)
//         console.log("Contents ----> ", contents);
//         return contents;
//       })
//       .catch((err) => {
       
//         return null;
//       });
//   }
//   return qrData;
// };

// import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
// import JSZip from "jszip";

// export const CERTIFICATE_FILE = "certificate.json";

// export const scanFilesForQr = async (selectedFile) => {
//   let scanResult = { data: null, error: null };
//   console.log("Scan Files | selectedFile : ", selectedFile);
//   try {
//     scanResult.data = await scanFile(selectedFile);
//     console.log("ScanResult Data: ", scanResult.data);
//   } catch (e) {
//     console.log(e);
//     if (e?.name === "InvalidPDFException") {
//       scanResult.error = "Invalid PDF";
//     } else if (e instanceof Event) {
//       scanResult.error = "Invalid Image";
//     } else {
//       scanResult.error = "Unknown error:" + e;
//     }
//   }
//   return scanResult;
// };

// export const decodeQrData = async (qrData) => {
//   if (qrData) {
//     const zip = new JSZip();

//     try {
//       // Load the ZIP data
//       const zipContents = await zip.loadAsync(qrData);
//       console.log("zip contents: ", zipContents);

//       // Extract the specific file from the ZIP
//       const fileContents = await zipContents.files[CERTIFICATE_FILE].async("text");
//       console.log("File Contents ----> ", fileContents);

//       // Ensure the content is valid JSON before parsing
//       let contents;
//       try {
  
//         contents = JSON.parse(fileContents);
//         console.log("contents after parse: ", contents);
//       } catch (jsonError) {
//         console.error("Error parsing JSON:", jsonError);
//         return null;
//       }

//       // Extract id and remaining data
//       const cred_id = contents.id || null;
//       const json_data = contents.credentialSubject ? JSON.stringify(contents.credentialSubject) : null;

//       console.log("cred_id: ", cred_id);
//       console.log("json_data: ", json_data);

//       if (cred_id && json_data) {

//         // Send the data to the backend
//         try{
//           const response = await fetch("http://localhost:3000/store-data", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             cred_id: cred_id,
//             json_data: json_data,
//           }),
//         });
//         console.log("response after call: ", response);
//         // const responseData = await response.json();
//         console.log("Data stored successfully:");
//       } catch( err){
//         console.error(err);
//       }
       
//       } else {
//         console.error("Missing cred_id or json_data. Skipping API call.");
//       }
//       console.log("before return:", fileContents);
//       return fileContents;
//     } catch (err) {
//       console.error("Error decoding QR data:", err);
//       return null;
//     }
//   }
//   return qrData;
// };

import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";
import JSZip from "jszip";
import { saveDataToBackend } from "./api"; // Import the function

export const CERTIFICATE_FILE = "certificate.json";

export const scanFilesForQr = async (selectedFile) => {
  let scanResult = { data: null, error: null };
  console.log("Scan Files | selectedFile : ", selectedFile);
  try {
    scanResult.data = await scanFile(selectedFile);
    console.log("ScanResult Data: ", scanResult.data);
  } catch (e) {
    console.log(e);
    if (e?.name === "InvalidPDFException") {
      scanResult.error = "Invalid PDF";
    } else if (e instanceof Event) {
      scanResult.error = "Invalid Image";
    } else {
      scanResult.error = "Unknown error:" + e;
    }
  }
  return scanResult;
};

export const decodeQrData = async (qrData) => {
  if (qrData) {
    const zip = new JSZip();

    try {
      // Load the ZIP data
      const zipContents = await zip.loadAsync(qrData);
      console.log("zip contents: ", zipContents);

      // Extract the specific file from the ZIP
      const fileContents = await zipContents.files[CERTIFICATE_FILE].async("text");
      console.log("File Contents ----> ", fileContents);

      // Ensure the content is valid JSON before parsing
      let contents;
      try {
        contents = JSON.parse(fileContents);
        console.log("contents after parse: ", contents);
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        return null;
      }

      // Extract id and remaining data
      const cred_id = contents.id || null;
      const json_data = contents.credentialSubject ? JSON.stringify(contents.credentialSubject) : null;

      console.log("cred_id: ", cred_id);
      console.log("json_data: ", json_data);

      if (cred_id && json_data) {
        try {
          await saveDataToBackend(cred_id, json_data); // Call the separated function
        } catch (err) {
          console.error("Error during API call:", err);
        }
      } else {
        console.error("Missing cred_id or json_data. Skipping API call.");
      }

      console.log("before return:", fileContents);
      return fileContents;
    } catch (err) {
      console.error("Error decoding QR data:", err);
      return null;
    }
  }
  return qrData;
};
