import { verifyCredential, downloadRevocationList } from "verification-sdk";
import { resolveDid } from "./did-utils";

let revocationList = [];
//   {
//     id: "did:rcw:51cb8716-6d4e-4088-a40a-9101895dad0d",
//     tags: [],
//     issuer:
//       "did:web:ridhima-25.github.io:VCDID:5d25086d-ede5-48a2-b629-08514cb24f30",
//     issuanceDate: "2024-05-16T08:11:32.805Z",
//   },
//   {
//     id: "did:rcw:9bda9483-0063-4e4e-b3f4-34b878f769c6",
//     tags: [],
//     issuer:
//       "did:web:ridhima-25.github.io:VCDID:5d25086d-ede5-48a2-b629-08514cb24f30",
//     issuanceDate: "2024-05-16T08:06:00.999Z",
//   },
//   {
//     id: "did:rcw:ebde9382-00f6-4d30-9165-6087a4a2bfae",
//     tags: [],
//     issuer:
//       "did:web:ridhima-25.github.io:VCDID:5d25086d-ede5-48a2-b629-08514cb24f30",
//     issuanceDate: "2024-05-02T10:15:33.437Z",
//   },
//   {
//     id: "did:rcw:40796780-3615-45fc-b362-575c1b5be548",
//     tags: [],
//     issuer: "did:upagriofficial:c60796b3-729d-4bc6-b01d-e736b90f9e9f",
//     issuanceDate: "2024-02-23T05:14:28.247Z",
//   },
//   {
//     id: "did:rcw:f3dab17e-1ce0-458b-b904-9fe3b9e8aebf",
//     tags: [],
//     issuer: "did:upagriofficial:d33c6d34-d990-495a-b873-586fce9f7524",
//     issuanceDate: "2024-02-22T11:52:51.396Z",
//   },
//   // {
//   //   id: "did:rcw:0c8f8650-9620-4a64-8dfd-02bc1085ede4",
//   //   tags: [],
//   //   issuer:
//   //     "did:web:hardik12-amnex.github.io:VCDID:2dd5d91b-a9df-47bc-9d53-b951cf75b870",
//   //   issuanceDate: "2024-05-14T09:12:49.000Z",
//   // },
// ];

const verify = async (credential) => {
  console.log("verify trace log1", credential);
  let resolutionResult = await resolveDid(
    credential?.proof?.verificationMethod
  );
  if (resolutionResult.didResolutionMetadata.error) {
    throw new Error(resolutionResult.didResolutionMetadata.error);
  }
  let issuerDID = resolutionResult.didDocument;
  console.log("verify trace log2", issuerDID.id);

  let revocationUrl =
    "http://10.128.3.15:80/credential/credentials/revocation-list";
  // revocationList = await downloadRevocationList(issuerDID.id, revocationUrl);
  console.log("Revocation List : ", revocationList);
  return await verifyCredential(issuerDID, credential, revocationList);
};

export { verify };
