import type { Bus } from "../../domain/model/bus";
import { BusAssembler } from "../../infrastructure/api/assembler/bus-assembler";
import { BusApi } from "../../infrastructure/api/bus-api";

const busApi = new BusApi();

/**
 * Represents the result of a paginated bus query.
 * Contains bus data along with pagination metadata.
 */
type PaginatedBusResult = {
    /** Array of buses in the current page */
    buses: Bus[];
    /** Total number of bus elements across all pages */
    totalElements: number;
    /** Total number of pages available */
    totalPages: number;
    /** Current page number (0-based) */
    currentPage: number;
    /** Number of elements per page */
    pageSize: number;
    /** Whether this is the first page */
    isFirst: boolean;
    /** Whether this is the last page */
    isLast: boolean;
};

/**
 * Service layer for bus-related operations.
 * Provides methods for fetching bus data with proper error handling and data transformation.
 */
export const busService = {

    /**
     * Retrieves all buses from the API.
     * 
     * @returns Promise that resolves to an array of Bus entities
     * @throws {Error} When API request fails or data transformation fails
     * 
     * @example
     * ```typescript
     * try {
     *   const buses = await busService.getAll();
     *   console.log(`Found ${buses.length} buses`);
     * } catch (error) {
     *   console.error('Failed to fetch buses:', error);
     * }
     * ```
     */
    async getAll(): Promise<Bus[]> {
        try {
            const resources = await busApi.getAllBuses();
            
            if (!resources) {
                return [];
            }
            
            if (!Array.isArray(resources)) {
                return [];
            }
            
            return resources.map(BusAssembler.toEntityFromResource);
            
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves buses with pagination support.
     * 
     * @param page - The page number to retrieve (0-based, defaults to 0)
     * @param size - The number of items per page (defaults to 5)
     * @returns Promise that resolves to a PaginatedBusResult containing buses and pagination metadata
     * @throws {Error} When API request fails or data transformation fails
     * 
     * @example
     * ```typescript
     * try {
     *   const result = await busService.getPaginated(0, 10);
     *   console.log(`Page ${result.currentPage + 1} of ${result.totalPages}`);
     *   console.log(`Showing ${result.buses.length} of ${result.totalElements} buses`);
     * } catch (error) {
     *   console.error('Failed to fetch paginated buses:', error);
     * }
     * ```
     */
    async getPaginated(page: number = 0, size: number = 5): Promise<PaginatedBusResult> {
        try {
            const response = await busApi.getPaginatedBuses(page, size);
            
            return BusAssembler.toPaginatedResult(response);
            
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves a specific bus by its ID.
     * 
     * @param id - The unique identifier of the bus to retrieve
     * @returns Promise that resolves to a Bus entity
     * @throws {Error} When API request fails, bus not found, or data transformation fails
     * 
     * @example
     * ```typescript
     * try {
     *   const bus = await busService.getById(123);
     *   console.log(`Found bus: ${bus.licensePlate} (${bus.brand})`);
     * } catch (error) {
     *   console.error('Bus not found or request failed:', error);
     * }
     * ```
     */
    async getById(id: number): Promise<Bus> {
        const resource = await busApi.getBusById(id);
        return BusAssembler.toEntityFromResource(resource);
    }
}