import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '../atoms/Icons';

/**
 * Properties for the Pagination component.
 */
type Props = {
  /** Current page number (0-based) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Total number of elements across all pages */
  totalElements: number;
  /** Number of elements per page (defaults to 5) */
  pageSize?: number;
  /** Callback function called when page changes */
  onPageChange: (page: number) => void;
  /** Whether the component is in loading state */
  loading?: boolean;
};

/**
 * Advanced pagination component with ellipsis support and responsive design.
 * Provides navigation controls for paginated data with smart page number display.
 * Includes mobile-responsive layout and loading state handling.
 * 
 * @param props - The component properties for pagination control
 * @returns JSX element representing pagination controls or null if single page
 */
export const Pagination = ({
  currentPage,
  totalPages,
  totalElements,
  pageSize = 5, 
  onPageChange,
  loading = false,
}: Props) => {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, totalElements);

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = [];
    if (currentPage <= 2) {
      for (let i = 0; i < 5; i++) pages.push(i);
      pages.push(-1);
      pages.push(totalPages - 1);
    } else if (currentPage >= totalPages - 3) {
      pages.push(0);
      pages.push(-1); 
      for (let i = totalPages - 5; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      pages.push(-1); 
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push(-2);
      pages.push(totalPages - 1);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const btnClass = (active = false) =>
    clsx(
      'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
      'ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
      active 
        ? 'z-10 bg-[#512E8A] text-white ring-[#512E8A]' 
        : 'text-gray-900 hover:bg-gray-50'
    );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst || loading}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Anterior
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast || loading}
          className="ml-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium text-[#512E8A]">{start}</span> a{' '}
            <span className="font-medium text-[#512E8A]">{end}</span> de{' '}
            <span className="font-medium text-[#512E8A]">{totalElements}</span> resultados
          </p>
        </div>

        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirst || loading}
            className="relative inline-flex items-center rounded-l-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {visiblePages.map((page, index) => {
            if (page === -1 || page === -2) {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={btnClass(page === currentPage)}
              >
                {page + 1}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLast || loading}
            className="relative inline-flex items-center rounded-r-md p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};