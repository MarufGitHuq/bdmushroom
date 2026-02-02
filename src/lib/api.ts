import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import axios from "axios";

const url = import.meta.env.VITE_WC_URL;
const consumerKey = import.meta.env.VITE_WC_KEY;
const consumerSecret = import.meta.env.VITE_WC_SECRET;

console.log("BD Mushroom API Initialization:", {
  url,
  hasKey: !!consumerKey,
  hasSecret: !!consumerSecret
});

// Library Instance (Requires node polyfills)
export const wcApi = new WooCommerceRestApi({
  url: url || "",
  consumerKey: consumerKey || "",
  consumerSecret: consumerSecret || "",
  version: "wc/v3",
  queryStringAuth: true
});

// Direct Fetch Fallback (Safer browser-side)
export const apiFetch = async (endpoint: string, params = {}, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) => {
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const urlWithParams = new URL(`${cleanUrl}/wp-json/wc/v3/${endpoint}`);

  // Add credentials to params
  const allParams: any = {
    ...params,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  };

  Object.keys(allParams).forEach(key => {
    if (allParams[key] !== undefined && allParams[key] !== null) {
      urlWithParams.searchParams.append(key, allParams[key].toString());
    }
  });

  const savedUser = localStorage.getItem('bdm_user');
  const token = savedUser ? JSON.parse(savedUser).token : null;

  const headers: HeadersInit = {};

  // ONLY send Authorization token for non-public data if needed.
  // Standard WC Product/Category listing should NOT have a Bearer token if it conflicts with Key/Secret
  // or triggers CORS preflight issues on production servers.
  const isPublicEndpoint = ['products', 'categories'].some(e => endpoint.startsWith(e)) && method === 'GET';

  if (token && !isPublicEndpoint) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (data && (method === 'POST' || method === 'PUT')) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(urlWithParams.toString(), {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`API Error [${response.status}] for ${endpoint}:`, errorData);
    throw { response: { data: errorData, status: response.status } };
  }

  return response.json();
};

export const API_URL = url;
