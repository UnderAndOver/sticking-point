import { NextResponse } from "next/server";
import { RevAiApiClient, RevAiJobOptions } from "revai-node-sdk";

// Create API route for fetching transcription jobs
export async function GET() {
  try {
    console.log("in request: get");
    const accessToken = process.env.NEXT_PUBLIC_REV_ACCESS_TOKEN || "bad";
    var res = await fetch(
      `https://www.rev.com/api/v1/attachments/${
        process.env.NEXT_PUBLIC_REV_TEST_ATTACHMENT || "test"
      }/content`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_REV_ACCESS_TOKEN2 || "test",
          Accept: "application/json+rev-transcript",
        },
      }
    );
    return NextResponse.json(res.body);
  } catch (error) {
    console.log("response error");
    return NextResponse.json(error);
  }
}
export async function POST(req: Request) {
  try {
    console.log("in request: post");
    const accessToken = process.env.NEXT_PUBLIC_REV_ACCESS_TOKEN || "bad";
    var client = new RevAiApiClient(accessToken);
    const res = await req.json();
    const urlToTranscribe = res.urlToTranscribe;
    const sourceConfig = {
      url: urlToTranscribe,
    };
    const jobOptions: RevAiJobOptions = {
      source_config: sourceConfig,
      metadata: "Sample submit job youtube",
      skip_diarization: false,
    };
    var job = await client.submitJob({
      media_url: urlToTranscribe,
    });
    return NextResponse.json(job);

    // const jobId = res.jobId;
    // var transcriptText = await client.getTranscriptText(jobId);
    // var transcriptObject = await client.getTranscriptObject(jobId);
    // return NextResponse.json({
    //   transcriptText: transcriptText,
    //   transcriptObject: transcriptObject,
    // });
  } catch (error) {
    return NextResponse.json(error);
  }
}

async function revSDKGET() {
  try {
    console.log("in request: get");
    const accessToken = process.env.NEXT_PUBLIC_REV_ACCESS_TOKEN || "bad";
    console.log("api key:" + accessToken);
    var client = new RevAiApiClient(accessToken);
    var jobs = await client.getListOfJobs();
    console.log(jobs);
    console.log("response received");
    return NextResponse.json(jobs);
  } catch (error) {
    console.log("response error");
    return NextResponse.json(error);
  }
}
