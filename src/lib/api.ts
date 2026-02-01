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
export const apiFetch = async (endpoint: string, params = {}) => {
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const fullUrl = `${cleanUrl}/wp-json/wc/v3/${endpoint}`;

  const response = await axios.get(fullUrl, {
    params: {
      ...params,
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    }
  });
  return response.data;
};

export const API_URL = url;
