import type { ReactNode } from 'react';

/**
 * Properties for the StatCard component.
 */
type Props = { 
  /** The label text to display above the value */
  label: string; 
  /** The numeric or string value to display prominently */
  value: string | number; 
  /** Tailwind CSS gradient class string for the background */
  gradient: string; 
  /** React node representing an icon to display */
  icon: ReactNode 
};

/**
 * A statistics card component that displays a labeled value with an icon and gradient background.
 * Used to show key metrics and statistics in a visually appealing format.
 * 
 * @param props - The component properties
 * @returns JSX element representing a styled statistics card
 */
export const StatCard = ({ label, value, gradient, icon }: Props) => (
  <div className={`bg-gradient-to-r ${gradient} rounded-lg p-4 text-white`}>
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);