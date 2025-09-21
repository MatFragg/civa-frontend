/**
 * Domain entity representing a bus brand/manufacturer.
 * Used for categorizing buses by their manufacturer.
 */
export interface BusBrand {
    /** Unique identifier for the bus brand */
    id: number;
    /** Name of the bus manufacturer (e.g., "Mercedes-Benz", "Volvo", "Scania") */
    name: string;
}