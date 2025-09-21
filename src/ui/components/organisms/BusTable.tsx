import type { Bus } from "../../../domain/model/bus";

/**
 * Properties for the BusTable component.
 */
type Props = { 
  /** Array of bus entities to display in the table */
  buses: Bus[]; 
  /** Whether the table is in loading state */
  loading: boolean 
};

/**
 * Loading spinner component displayed while data is being fetched.
 * Shows a centered animated spinner with consistent styling.
 * 
 * @returns JSX element representing a loading spinner
 */
const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-10 h-10 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin" />
  </div>
);

/**
 * Table component for displaying bus fleet data in a structured format.
 * Features responsive design, loading states, and empty state handling.
 * Displays bus information including number, license plate, brand, characteristics, status, and creation date.
 * 
 * @param props - The component properties containing bus data and loading state
 * @returns JSX element representing a bus data table with loading and empty states
 */
export const BusTable = ({ buses, loading }: Props) => {
  if (loading) return <Spinner />;
  if (buses.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">No hay buses disponibles</div>
    );

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Número de Bus</th>
            <th className="px-4 py-3 text-left">Placa</th>
            <th className="px-4 py-3 text-left">Marca de Bus</th>
            <th className="px-4 py-3 text-left">Características</th>
            <th className="px-4 py-3 text-center">Activo</th>
            <th className="px-4 py-3 text-left">Creado El</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {buses.map((bus) => (
            <tr
              key={bus.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-3">{bus.busNumber}</td>
              <td className="px-4 py-3 font-mono text-gray-600">
                {bus.licensePlate}
              </td>
              <td className="px-4 py-3">{bus.brand}</td>
              <td className="px-4 py-3 max-w-xs truncate">{bus.characteristics}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    bus.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {bus.isActive ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(bus.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};