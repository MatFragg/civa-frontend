import { BusPageHeader } from '../components/molecules/BusPageHeader';
import { ErrorPanel } from '../components/molecules/ErrorPanel';
import { useBuses } from '../../domain/hooks/useBuses';
import { BusTable } from '../components/organisms/BusTable';
import { useState } from 'react';
import { Pagination } from '../components/organisms/Pagination';

/**
 * Main page component for the bus management system.
 * Handles the display of bus data with pagination, statistics, and error handling.
 * Integrates multiple components to provide a complete bus fleet management interface.
 * 
 * @returns JSX element representing the complete bus management page
 */
export const BusPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { buses, loading, error, refetch, pagination } = useBuses(currentPage);

  if (error) return <ErrorPanel message={error} onRetry={refetch} />;

  const activeBuses = buses.filter((bus) => bus.isActive);
  const inactiveBuses = buses.filter((bus) => !bus.isActive);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

   const mockPagination = {
    currentPage: currentPage,
    totalPages: Math.ceil(buses.length / 5),
    totalElements: buses.length,
    pageSize: 5
  };

  const paginationData = pagination || mockPagination;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        <BusPageHeader
          total={paginationData.totalElements}
          active={activeBuses.length}
          inactive={inactiveBuses.length}
          onRefresh={refetch}
          loading={loading}
        />

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <BusTable buses={buses} loading={loading} />

          {paginationData.totalPages > 1 && (
            <Pagination
              currentPage={paginationData.currentPage}
              totalPages={paginationData.totalPages}
              totalElements={paginationData.totalElements}
              pageSize={paginationData.pageSize}
              onPageChange={handlePageChange}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};