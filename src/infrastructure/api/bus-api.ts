import { httpClient } from "../../shared/services/fetchHttpClient";
import type { BusesResponse, BusResource, PaginatedBusResponse } from "./responses/buses-responses";

/**
 * API client for bus-related HTTP operations.
 * Handles all communication with the backend bus service endpoints.
 */
export class BusApi {
  private readonly endpointPath: string;

  /**
   * Creates a new BusApi instance.
   * 
   * @param endpointPath - Optional custom endpoint path. Defaults to '/api/v1/buses'
   * 
   * @example
   * ```typescript
   * // Using default endpoint
   * const busApi = new BusApi();
   * 
   * // Using custom endpoint
   * const customBusApi = new BusApi('/api/v2/buses');
   * ```
   */
  constructor(endpointPath?: string) {
    this.endpointPath = endpointPath || '/api/v1/buses';
  }

  /**
   * Fetches all buses from the API.
   * Handles different response formats and provides fallback to empty array.
   * 
   * @returns Promise that resolves to an array of BusResource objects
   * @throws {Error} When the HTTP request fails or server returns an error status
   * 
   * @example
   * ```typescript
   * try {
   *   const buses = await busApi.getAllBuses();
   *   console.log(`Retrieved ${buses.length} buses`);
   * } catch (error) {
   *   console.error('Failed to fetch all buses:', error);
   * }
   * ```
   */
  async getAllBuses(): Promise<BusResource[]> {
    try {
      const response = await httpClient.get<BusesResponse>(this.endpointPath);

      if (Array.isArray(response)) {
        return response as BusResource[];
      }
      
      if (response && response.buses) {
        return response.buses;
      }
      
      return [];
      
    } catch (error) {
      console.error('Error in busService.getAll:', error);
      throw error;
    }
  }

  /**
   * Fetches buses with pagination support.
   * Constructs the appropriate query parameters for paginated requests.
   * 
   * @param page - The page number to retrieve (0-based, defaults to 0)
   * @param size - The number of items per page (defaults to 5)
   * @returns Promise that resolves to a PaginatedBusResponse with buses and pagination metadata
   * @throws {Error} When the HTTP request fails or server returns an error status
   * 
   * @example
   * ```typescript
   * try {
   *   const response = await busApi.getPaginatedBuses(1, 10);
   *   console.log(`Page ${response.number + 1}, Total pages: ${response.totalPages}`);
   * } catch (error) {
   *   console.error('Failed to fetch paginated buses:', error);
   * }
   * ```
   */
  async getPaginatedBuses(page: number = 0, size: number = 5): Promise<PaginatedBusResponse> {
    try {
      const url = `${this.endpointPath}?paginated=true&page=${page}&size=${size}`;
      
      const response = await httpClient.get<PaginatedBusResponse>(url);
      
      return response;
      
    } catch (error) {
      console.error('Error in getPaginatedBuses:', error);
      throw error;
    }
  }

  /**
   * Fetches a specific bus by its unique identifier.
   * 
   * @param id - The unique identifier of the bus to retrieve
   * @returns Promise that resolves to a BusResource object
   * @throws {Error} When the HTTP request fails, bus is not found (404), or server returns an error status
   * 
   * @example
   * ```typescript
   * try {
   *   const bus = await busApi.getBusById(123);
   *   console.log(`Bus found: ${bus.licensePlate}`);
   * } catch (error) {
   *   if (error.status === 404) {
   *     console.error('Bus not found');
   *   } else {
   *     console.error('Failed to fetch bus:', error);
   *   }
   * }
   * ```
   */
  async getBusById(id: number): Promise<BusResource> {
    try {
      return await httpClient.get<BusResource>(`${this.endpointPath}/${id}`);
    } catch (error) {
      throw error;
    }
  }
}