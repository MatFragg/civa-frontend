import { RefreshIcon } from '../atoms/Icons';
import { StatsCards } from './StatsCards';

/**
 * Properties for the BusPageHeader component.
 */
type Props = {
  /** Total number of buses in the fleet */
  total: number;
  /** Number of active buses */
  active: number;
  /** Number of inactive buses */
  inactive: number;  
  /** Callback function to refresh data */
  onRefresh: () => void;
  /** Whether the component is in loading state */
  loading: boolean;
  /** Current page number (optional, defaults to 1) */
  currentPage?: number;  
  /** Total number of pages (optional, defaults to 1) */
  totalPages?: number;   
}; 

/**
 * Header component for the bus management page.
 * Displays page title, description, refresh functionality, and bus fleet statistics.
 * Combines the main page heading with statistics cards in a cohesive layout.
 * 
 * @param props - The component properties containing bus statistics and control handlers
 * @returns JSX element representing the page header with title, controls, and statistics
 */
export const BusPageHeader = ({ 
  total, 
  active, 
  inactive,  
  onRefresh, 
  loading, 
  currentPage = 1, 
  totalPages = 1 
}: Props) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
    <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Flota de Buses</h1>
        <p className="mt-1 text-sm text-gray-600">Maneja y monitorea las operaciones de tu flota de buses</p>
      </div>

      <div className="mt-4 sm:mt-0 flex space-x-3">
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#512E8A] hover:bg-[#6B46C1] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <RefreshIcon className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>

      </div>
    </div>

    <StatsCards 
      total={total} 
      active={active} 
      inactive={inactive}  
      currentPage={currentPage} 
      totalPages={totalPages} 
    />
  </div>
);