import {
  RevAiApiClient,
  RevAiApiDeployment,
  RevAiApiDeploymentConfigMap,
} from "revai-node-sdk";
export const fetchTranscription = async (jobId: string) => {
  const accessToken = process.env.NEXT_PUBLIC_REV_API_KEY || "bad";

  var client = new RevAiApiClient(accessToken);
  console.log(jobId);
  var transcriptText = await client.getTranscriptText(jobId);
  var transcriptObject = await client.getTranscriptObject(jobId);
  //return both
  return {
    transcriptText: transcriptText,
    transcriptObject: transcriptObject,
  };
};

export const fetchTranscriptionJobs = async () => {
  const accessToken = process.env.NEXT_PUBLIC_REV_API_KEY || "bad";
  var client = new RevAiApiClient(accessToken);
  var jobs = await client.getListOfJobs();
  return jobs;
};
