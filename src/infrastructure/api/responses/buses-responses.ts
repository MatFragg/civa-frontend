
/**
 * Response interface for the buses API endpoint.
 * Contains an array of bus resources and the total count.
 */
export interface BusesResponse {
    /** Array of bus resources returned from the API */
    buses: BusResource[];
    /** Total number of buses available */
    total: number;
}

/**
 * Resource interface representing a bus entity from the API.
 * Contains all bus-related information as received from the backend.
 */
export interface BusResource {
    /** Unique identifier for the bus */
    id: number;
    /** Bus number used for identification */
    busNumber: number;
    /** License plate of the bus */
    licensePlate: string;
    /** Brand/manufacturer of the bus */
    brand: string;
    /** Description of bus characteristics and features */
    characteristics: string;
    /** Whether the bus is currently active in service */
    isActive: boolean;
    /** ISO 8601 timestamp of when the bus was created */
    createdAt: string;
}

/**
 * Response interface for paginated bus queries.
 * Follows Spring Boot's Page interface structure with comprehensive pagination metadata.
 */
export interface PaginatedBusResponse {
    /** Array of bus resources in the current page */
    content: BusResource[];
    /** Pagination configuration and metadata */
    pageable: {
        /** Current page number (0-based) */
        pageNumber: number;
        /** Number of elements per page */
        pageSize: number;
        /** Sorting information */
        sort: {
            /** Whether sort parameters are empty */
            empty: boolean;
            /** Whether results are sorted */
            sorted: boolean;
            /** Whether results are unsorted */
            unsorted: boolean;
        };
        /** Offset from the beginning of the dataset */
        offset: number;
        /** Whether pagination is enabled */
        paged: boolean;
        /** Whether pagination is disabled */
        unpaged: boolean;
    };
    /** Whether this is the last page */
    last: boolean;
    /** Total number of elements across all pages */
    totalElements: number;
    /** Total number of pages available */
    totalPages: number;
    /** Number of elements in the current page */
    size: number;
    /** Current page number (0-based) */
    number: number;
    /** Sorting information for the current response */
    sort: {
        /** Whether sort parameters are empty */
        empty: boolean;
        /** Whether results are sorted */
        sorted: boolean;
        /** Whether results are unsorted */
        unsorted: boolean;
    };
    /** Whether this is the first page */
    first: boolean;
    /** Number of elements in the current page content */
    numberOfElements: number;
    /** Whether the current page is empty */
    empty: boolean;
}