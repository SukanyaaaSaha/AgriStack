import { SetScanResultFunction } from "../../../../types/function-types";
import { ScanStatus } from "../../../../types/data-types";
export const ScanAsset = ({
  setScanResult,
  displayMessage,
  setScanStatus,
}: {
  setScanResult: SetScanResultFunction;
  displayMessage: string;
  setScanStatus: (status: ScanStatus) => void;
}) => {};
