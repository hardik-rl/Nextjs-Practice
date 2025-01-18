const apiCall = async (endpoint, method = 'GET', data = null, headers = {}) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const url = `${baseUrl}${endpoint}`;
  
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };
  
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(url, options);
  
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
  
      const responseData = await response.json();
      console.log(responseData, "responseData");
      
      return responseData;
    } catch (error) {
      console.log('API call failed:', error.message);
      throw error;
    }
  };
  
  export default apiCall;
  