export const baseFetch = async (req: RequestInfo, init?: RequestInit) => {
  try {
    const response = await fetch(req, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return null; // Return null or an empty object based on your needs
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
