import { NextResponse } from "next/server";
import dotenv from "dotenv"
dotenv.config();
export async function POST(request) {
  try {
    const { input_value, tweaks } = await request.json();

    const url = "https://langflow-api-1.onrender.com";

    const apiToken=process.env.API_TOKEN;
    if(!apiToken) {
      throw new Error("API token is missing");
    }

    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        input_value,
        tweaks,
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Langflow API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Successful response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    return NextResponse.json(
      {
        error: true,
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
