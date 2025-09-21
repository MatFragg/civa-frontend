const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TIMEOUT = 10_000;


console.log('🔧 Debug Environment Variables:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  BASE_URL: BASE_URL
});

/**
 * Constructs a full URL by combining the base URL with an endpoint path.
 * 
 * @param endpoint - The API endpoint path to append to the base URL
 * @returns The complete URL string
 * 
 * @example
 * ```typescript
 * const url = buildURL('/api/v1/buses');
 * // Returns: "http://localhost:8080/api/v1/buses"
 * ```
 */
function buildURL(endpoint: string) {
  const fullUrl = `${BASE_URL}${endpoint}`;
  return fullUrl;
}

/**
 * Creates an AbortSignal that will automatically abort after a specified timeout.
 * Used to implement request timeouts for fetch operations.
 * 
 * @param ms - Timeout duration in milliseconds
 * @returns A tuple containing the AbortSignal and the timeout ID
 * 
 * @example
 * ```typescript
 * const [signal, timerId] = timeoutSignal(5000);
 * // Use signal in fetch request, clear timeout with clearTimeout(timerId)
 * ```
 */
function timeoutSignal(ms: number): [AbortSignal, number] {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return [ctrl.signal, id];
}

/**
 * Generic HTTP request function with automatic timeout, JSON handling, and error parsing.
 * Provides a unified interface for making HTTP requests with proper error handling.
 * 
 * @template T - The expected response type
 * @param endpoint - The API endpoint path (will be combined with base URL)
 * @param options - Fetch options with optional jsonBody for automatic JSON serialization
 * @returns Promise that resolves to the parsed response of type T
 * @throws {Error} Enhanced error object with status code and parsed error data
 * 
 * @example
 * ```typescript
 * // GET request
 * const data = await request<User[]>('/api/users');
 * 
 * // POST request with JSON body
 * const user = await request<User>('/api/users', {
 *   method: 'POST',
 *   jsonBody: { name: 'John', email: 'john@example.com' }
 * });
 * ```
 */
async function request<T>(
  endpoint: string,
  options: RequestInit & { jsonBody?: unknown } = {}
): Promise<T> {
  const [signal, timer] = timeoutSignal(TIMEOUT);

  try {
    const hasJsonBody = options.jsonBody !== undefined;
    
    const headers: HeadersInit = options.headers || {};
    
    const finalHeaders: HeadersInit = hasJsonBody 
      ? { ...headers, "Content-Type": "application/json" }
      : headers;

    const res = await fetch(buildURL(endpoint), {
      ...options,
      signal,
      headers: finalHeaders,
      body: hasJsonBody ? JSON.stringify(options.jsonBody) : options.body,
    });

    if (!res.ok) {
      let errorData = null;
      const text = await res.text();
      
      try {
        errorData = text ? JSON.parse(text) : null;
      } catch {
        errorData = text;
      }
      
      throw Object.assign(new Error(text || res.statusText), {
        status: res.status,
        data: errorData,
      });
    }
    
    if (res.status === 204) return undefined as unknown as T;
    
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return res.json();
    }
    
    return res.text() as unknown as T;
    
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
  finally {
    clearTimeout(timer);
  }
}

/**
 * HTTP client with convenient methods for common REST operations.
 * Provides type-safe HTTP methods with automatic JSON handling and timeout support.
 * 
 * @example
 * ```typescript
 * // GET request
 * const users = await httpClient.get<User[]>('/api/users');
 * 
 * // POST request
 * const newUser = await httpClient.post<User>('/api/users', {
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * 
 * // PUT request
 * const updatedUser = await httpClient.put<User>('/api/users/1', userData);
 * 
 * // DELETE request
 * await httpClient.del('/api/users/1');
 * ```
 */
export const httpClient = {
  /**
   * Performs a GET request.
   * 
   * @template T - Expected response type
   * @param url - The endpoint URL
   * @param init - Optional fetch configuration
   * @returns Promise resolving to the response data
   */
  get: <T>(url: string, init?: RequestInit) => 
    request<T>(url, { ...init, method: "GET" }),
  
  /**
   * Performs a POST request with JSON body.
   * 
   * @template T - Expected response type
   * @template B - Request body type
   * @param url - The endpoint URL
   * @param body - Request body that will be JSON serialized
   * @param init - Optional fetch configuration
   * @returns Promise resolving to the response data
   */
  post: <T, B = unknown>(url: string, body?: B, init?: RequestInit) => 
    request<T>(url, { ...init, method: "POST", jsonBody: body }),
  
  /**
   * Performs a PUT request with JSON body.
   * 
   * @template T - Expected response type
   * @template B - Request body type
   * @param url - The endpoint URL
   * @param body - Request body that will be JSON serialized
   * @param init - Optional fetch configuration
   * @returns Promise resolving to the response data
   */
  put: <T, B = unknown>(url: string, body?: B, init?: RequestInit) => 
    request<T>(url, { ...init, method: "PUT", jsonBody: body }),
  
  /**
   * Performs a PATCH request with JSON body.
   * 
   * @template T - Expected response type
   * @template B - Request body type
   * @param url - The endpoint URL
   * @param body - Request body that will be JSON serialized
   * @param init - Optional fetch configuration
   * @returns Promise resolving to the response data
   */
  patch: <T, B = unknown>(url: string, body?: B, init?: RequestInit) => 
    request<T>(url, { ...init, method: "PATCH", jsonBody: body }),
  
  /**
   * Performs a DELETE request.
   * 
   * @template T - Expected response type
   * @param url - The endpoint URL
   * @param init - Optional fetch configuration
   * @returns Promise resolving to the response data
   */
  del: <T>(url: string, init?: RequestInit) => 
    request<T>(url, { ...init, method: "DELETE" }),
};