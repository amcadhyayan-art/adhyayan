export const BACKEND_URLS = [
  'https://adhyayanvbackend-slcv.onrender.com',
  'https://adhyayanvbackend-upqu.onrender.com',
  'https://adhyayanvbackend-jhc5.onrender.com',
  'https://adhyayanvbackend-2yjg.onrender.com'
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || BACKEND_URLS[0];

const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let urlString = '';
  if (typeof input === 'string') {
    urlString = input;
  } else if (input instanceof URL) {
    urlString = input.toString();
  } else {
    urlString = input.url;
  }

  let isBackendRequest = false;
  let requestPath = '';
  
  for (const baseUrl of BACKEND_URLS) {
    if (urlString.startsWith(baseUrl)) {
      isBackendRequest = true;
      requestPath = urlString.substring(baseUrl.length);
      break;
    }
  }

  if (!isBackendRequest && urlString.startsWith(API_BASE_URL)) {
    isBackendRequest = true;
    requestPath = urlString.substring(API_BASE_URL.length);
  }

  if (!isBackendRequest) {
    return originalFetch(input, init);
  }

  let lastError: any;
  for (const baseUrl of BACKEND_URLS) {
    try {
      const newUrl = `${baseUrl}${requestPath}`;
      const response = await originalFetch(newUrl, init);
      
      if (!response.ok && response.status >= 500) {
        lastError = new Error(`Server ${baseUrl} returned ${response.status}`);
        console.warn(`[Failover] ${baseUrl} failed with ${response.status}, trying next...`);
        continue;
      }
      
      return response;
    } catch (error) {
      console.warn(`[Failover] Network error with ${baseUrl}, trying next...`);
      lastError = error;
    }
  }
  
  throw lastError;
};
