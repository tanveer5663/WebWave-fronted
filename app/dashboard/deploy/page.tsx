import React from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Home from "./Homepage";

async function page() {
  const { userId } = await auth();

  const provider = "github";
  const client = await clerkClient();

  const clerkResponse: any = await client.users.getUserOauthAccessToken(
    userId!,
    provider
  );

  const accessToken: any = clerkResponse.data[0]?.token || "";

  const response = await fetch(
    `https://api.github.com/user/repos?per_page=7&page=1&sort=created&direction=desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      // Ensure fresh data on each request
    }
  );
  const data = await response.json();
  return <Home repo={data} userId={userId} />;
}

export default page;
