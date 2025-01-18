const apiCall = async (endpoint, method = 'GET', data = null, headers = {}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable for base URL
    const url = `${baseUrl}${endpoint}`; // Construct the full API URL

    const options = {
      method, // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers: {
        'Content-Type': 'application/json',
        ...headers, // Merge custom headers
      },
    };

    // Add the request body only for applicable methods
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Handle HTTP errors more gracefully
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`
      );
    }

    // Parse the JSON response
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('API call failed:', error.message);
    throw error;
  }
};

export default apiCall;
