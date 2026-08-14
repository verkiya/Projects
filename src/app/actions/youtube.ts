"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function fetchLikedVideos() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to sync liked videos.");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
  
  if (primaryEmail !== "altertechego@gmail.com") {
    throw new Error("Only altertechego@gmail.com is authorized to fetch YouTube liked videos.");
  }

  const tokenResponse = await client.users.getUserOauthAccessToken(userId, "oauth_google");

  if (!tokenResponse.data || tokenResponse.data.length === 0) {
    throw new Error(
      "No Google OAuth token found. Please connect your Google account in your Clerk profile."
    );
  }

  const accessToken = tokenResponse.data[0].token;

  // Fetch from YouTube Data API
  let allVideos: any[] = [];
  let nextPageToken = "";
  let pageCount = 0;

  do {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?myRating=like&part=snippet&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;
    const ytResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!ytResponse.ok) {
      const errorData = await ytResponse.json();
      if (errorData.error?.status === "PERMISSION_DENIED" || ytResponse.status === 403) {
        throw new Error("YouTube API permission denied. Make sure you have authorized the 'youtube.readonly' scope.");
      }
      throw new Error(`Failed to fetch from YouTube: ${ytResponse.statusText}`);
    }

    const data = await ytResponse.json();
    if (data.items) {
      allVideos = [...allVideos, ...data.items];
    }
    
    nextPageToken = data.nextPageToken;
    pageCount++;
  } while (nextPageToken && pageCount < 50); // limit to 50 pages (2500 videos) to prevent timeouts

  if (allVideos.length === 0) {
    return [];
  }

  return allVideos.map((item: any) => ({
    title: item.snippet.title,
    channelName: item.snippet.channelTitle,
    videoId: item.id,
    url: `https://www.youtube.com/watch?v=${item.id}`,
  }));
}
