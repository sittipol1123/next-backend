interface ApiResponse {
  // Define your API response object type here
  // For example:
  // data: { name: string };
}

const getAuthorizationHeader = () => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return `Bearer ${userToken}`;
  } else {
    throw new Error("User not authenticated");
  }
};

export const api = {
  async fetch(endpoint: string): Promise<ApiResponse> {
    const response = await fetch(`https://example.com/${endpoint}`, {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch data from API: ${response.status}`);
    }
  },
};
