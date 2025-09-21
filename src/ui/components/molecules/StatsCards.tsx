import { StatCard } from '../atoms/StatCard';
import { CheckCircleIcon, ExclamationCircleIcon, TruckIcon } from '../atoms/Icons';

type Props = {
  total: number;
  active: number;
  inactive: number;  
  currentPage?: number;
  totalPages?: number;
};

export const StatsCards = ({ total, active, inactive, currentPage, totalPages }: Props) => (
  <div className="px-6 py-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Active Buses"
        value={active}
        gradient="from-[#F43F8C] to-[#E8367F]"
        icon={<CheckCircleIcon className="h-6 w-6" />}
      />
      <StatCard
        label="Inactive Buses"
        value={inactive}
        gradient="from-[#9CA3AF] to-[#7C7C8C]"
        icon={<ExclamationCircleIcon className="h-6 w-6" />}
      />
      <StatCard
        label="Total Fleet"
        value={total}
        gradient="from-[#6B46C1] to-[#5A3AA8]"
        icon={<TruckIcon className="h-6 w-6" />}
      />
    </div>
  </div>
);