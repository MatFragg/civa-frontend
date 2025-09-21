import { StatCard } from '../atoms/StatCard';
import { CheckCircleIcon, ExclamationCircleIcon, TruckIcon } from '../atoms/Icons';


/**
 * Props for the StatsCards component
 */
type Props = {
  /** Total number of buses in the fleet */
  total: number;
  /** Number of active buses */
  active: number;
  /** Number of inactive buses */
  inactive: number;  
  /** Current page number (optional, not used in current implementation) */
  currentPage?: number;
  /** Total number of pages (optional, not used in current implementation) */
  totalPages?: number;
};

/**
 * StatsCards component displays fleet statistics in a responsive grid layout
 * 
 * This component renders three statistical cards showing:
 * - Active buses count with a success-themed gradient
 * - Inactive buses count with a neutral-themed gradient  
 * - Total fleet count with a primary-themed gradient
 * 
 * The component uses a responsive grid that displays one card per row on mobile
 * and three cards per row on larger screens.
 * 
 * @param props - Component props
 * @param props.total - Total number of buses in the fleet
 * @param props.active - Number of currently active buses
 * @param props.inactive - Number of currently inactive buses
 * @param props.currentPage - Current page number (optional, reserved for future use)
 * @param props.totalPages - Total number of pages (optional, reserved for future use)
 * @returns JSX element containing the statistics cards grid
 */
export const StatsCards = ({ total, active, inactive, currentPage, totalPages }: Props) => (
  <div className="px-6 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Buses Activos"
        value={active}
        gradient="from-[#F43F8C] to-[#E8367F]"
        icon={<CheckCircleIcon className="h-6 w-6" />}
      />
      <StatCard
        label="Buses Inactivos"
        value={inactive}
        gradient="from-[#9CA3AF] to-[#7C7C8C]"
        icon={<ExclamationCircleIcon className="h-6 w-6" />}
      />
      <StatCard
        label="Flota Total"
        value={total}
        gradient="from-[#6B46C1] to-[#5A3AA8]"
        icon={<TruckIcon className="h-6 w-6" />}
      />
    </div>
  </div>
);
