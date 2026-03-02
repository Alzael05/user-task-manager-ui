
export const getAuthorizationAccessToken = async (): Promise<string> => {
  const { accessToken } = await fetch("/auth/token", {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch access token");
    return res.json();
  });

  return accessToken;
};

export const getAuthorizationHeader = async (): Promise<{
  Authorization: string;
}> => {
  const accessToken = await getAuthorizationAccessToken();
  return { Authorization: `Bearer ${accessToken}` };
};
