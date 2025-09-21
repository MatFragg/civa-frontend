import type { Bus } from "../../../domain/model/bus";
import type { BusesResponse, BusResource, PaginatedBusResponse } from "../responses/buses-responses";

/**
 * Assembler class responsible for transforming API responses into domain entities.
 * Provides static methods to convert between different data representations.
 */
export class BusAssembler {
    /**
     * Converts a BusResource from API response to a Bus domain entity.
     * 
     * @param resource - The BusResource object from the API response
     * @returns A Bus domain entity with all properties mapped
     * 
     * @example
     * ```typescript
     * const apiResource = {
     *   id: 1,
     *   busNumber: 101,
     *   licensePlate: "ABC-123",
     *   brand: "Mercedes",
     *   isActive: true,
     *   characteristics: "Air conditioning, WiFi",
     *   createdAt: "2023-01-01T00:00:00Z"
     * };
     * 
     * const bus = BusAssembler.toEntityFromResource(apiResource);
     * ```
     */
    static toEntityFromResource(resource: BusResource): Bus {
        return{
            id: resource.id,
            busNumber: resource.busNumber,
            licensePlate: resource.licensePlate,
            brand: resource.brand,
            isActive: resource.isActive,
            characteristics: resource.characteristics,
            createdAt: resource.createdAt
        };
    }

    /**
     * Converts a BusesResponse containing multiple buses to an array of Bus domain entities.
     * 
     * @param response - The BusesResponse object from the API
     * @returns An array of Bus domain entities
     * 
     * @example
     * ```typescript
     * const apiResponse = {
     *   buses: [busResource1, busResource2],
     *   total: 2
     * };
     * 
     * const buses = BusAssembler.toEntitiesFromResponse(apiResponse);
     * console.log(`Converted ${buses.length} buses`);
     * ```
     */
    static toEntitiesFromResponse(response: BusesResponse): Bus[] {
        return response.buses.map(this.toEntityFromResource);
    }

    /**
     * Extracts and converts buses from a paginated API response to domain entities.
     * 
     * @param response - The PaginatedBusResponse object from the API
     * @returns An array of Bus domain entities from the current page
     * 
     * @example
     * ```typescript
     * const paginatedResponse = {
     *   content: [busResource1, busResource2],
     *   totalElements: 100,
     *   number: 0,
     *   size: 10,
     *   // ... other pagination fields
     * };
     * 
     * const buses = BusAssembler.toEntitiesFromPaginatedResponse(paginatedResponse);
     * ```
     */
    static toEntitiesFromPaginatedResponse(response: PaginatedBusResponse): Bus[] {
        return response.content.map(this.toEntityFromResource);
    }

    /**
     * Transforms a PaginatedBusResponse into a structured result object.
     * Converts the API response format to a more convenient domain-specific format.
     * 
     * @param response - The PaginatedBusResponse object from the API
     * @returns A structured object containing buses and pagination metadata
     * 
     * @example
     * ```typescript
     * const apiResponse = {
     *   content: [busResource1, busResource2],
     *   totalElements: 100,
     *   totalPages: 10,
     *   number: 0,
     *   size: 10,
     *   first: true,
     *   last: false
     * };
     * 
     * const result = BusAssembler.toPaginatedResult(apiResponse);
     * console.log(`Page ${result.currentPage + 1} of ${result.totalPages}`);
     * ```
     */
    static toPaginatedResult(response: PaginatedBusResponse) {
        return {
            buses: this.toEntitiesFromPaginatedResponse(response),
            totalElements: response.totalElements,
            totalPages: response.totalPages,
            currentPage: response.number,
            pageSize: response.size,
            isFirst: response.first,
            isLast: response.last
        };
    }

}