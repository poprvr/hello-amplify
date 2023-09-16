import React, { useEffect } from "react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import { Loader } from "@aws-amplify/ui-react";

const AmplifyLiveness: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [createLivenessApiData, setCreateLivenessApiData] = React.useState<{
    sessionId: string;
  } | null>(null);

  useEffect(() => {
    fetchCreateLiveness();
  });

  const fetchCreateLiveness = async () => {
    setCreateLivenessApiData({ sessionId: "mockSessionId" });
    setLoading(false);
  };

  const handleAnalysisComplete: () => Promise<void> = async () => {
    /*
     * This should be replaced with a real call to your own backend API
     */
    const response = await fetch(
      `/api/get?sessionId=${createLivenessApiData?.sessionId}`
    );
    const data = await response.json();

    /*
     * Note: The isLive flag is not returned from the GetFaceLivenessSession API
     * This should be returned from your backend based on the score that you
     * get in response. Based on the return value of your API you can determine what to render next.
     * Any next steps from an authorization perspective should happen in your backend and you should not rely
     * on this value for any auth related decisions.
     */
    if (data.isLive) {
      console.log("User is live");
    } else {
      console.log("User is not live");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <FaceLivenessDetector
      sessionId={createLivenessApiData?.sessionId || ""}
      region="us-east-1"
      onAnalysisComplete={handleAnalysisComplete}
      onError={(error) => {
        console.error(error);
      }}
    />
  );
};
export default AmplifyLiveness;
