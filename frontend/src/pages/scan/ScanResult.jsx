import ScanHeader from "../scan/ScanHeader";
import ScanSummary from "../scan/ScanSummary";
import DetectedPorts from "../scan/DetectedPorts";
import ScanRecommendations from "../scan/ScanRecommendations";

const ScanResult = () => {
  return (
    <div className="scan-page">
      <ScanHeader />
      <ScanSummary />
      <DetectedPorts />
      <ScanRecommendations />
    </div>
  );
};

export default ScanResult;
