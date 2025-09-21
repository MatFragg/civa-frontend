import { useState, useEffect } from 'react';
import type { Bus } from '../model/bus';
import { busService } from '../../application/service/bus-service';

/**
 * Type definition for pagination metadata.
 * Contains information about the current page state and navigation capabilities.
 */
type PaginationData = {
  /** Current page number (0-based) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Total number of bus elements across all pages */
  totalElements: number;
  /** Number of elements per page */
  pageSize: number;
  /** Whether this is the first page */
  isFirst: boolean;
  /** Whether this is the last page */
  isLast: boolean;
};

/**
 * Custom React hook for managing bus data with pagination support.
 * Provides loading states, error handling, and automatic data fetching.
 * 
 * @param page - The initial page number to load (0-based, defaults to 0)
 * @returns Object containing buses data, loading state, error state, refetch function, and pagination metadata
 * 
 * @example
 * ```typescript
 * function BusListComponent() {
 *   const { buses, loading, error, refetch, pagination } = useBuses(0);
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 * 
 *   return (
 *     <div>
 *       {buses.map(bus => <BusCard key={bus.id} bus={bus} />)}
 *       <button onClick={refetch}>Refresh</button>
 *       <p>Page {pagination?.currentPage + 1} of {pagination?.totalPages}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useBuses = (page: number = 0) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  /**
   * Internal function to fetch buses from the API with pagination.
   * Handles loading states, error management, and data transformation.
   * 
   * @param currentPage - The page number to fetch (0-based, defaults to 0)
   * @param pageSize - The number of items per page (defaults to 5)
   */
  const fetchBuses = async (currentPage: number = 0, pageSize: number = 5) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await busService.getPaginated(currentPage, pageSize);
      
      
      setBuses(result.buses);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalElements: result.totalElements,
        pageSize: result.pageSize,
        isFirst: result.isFirst,
        isLast: result.isLast
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading buses';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses(page);
  }, [page]);

  /**
   * Function to manually refetch the current page data.
   * Useful for refreshing data after operations or on user request.
   */
  const refetch = async () => {
    await fetchBuses(page);
  };

  return {
    /** Array of buses for the current page */
    buses,
    /** Loading state indicator */
    loading,
    /** Error message if any operation failed */
    error,
    /** Function to manually refresh the current page data */
    refetch,
    /** Pagination metadata including current page, total pages, etc. */
    pagination
  };
};