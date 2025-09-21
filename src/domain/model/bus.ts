
/**
 * Domain entity representing a bus in the transportation system.
 * Contains all essential information about a bus including its identification,
 * physical properties, status, and metadata.
 */
export interface Bus {
    /** Unique identifier for the bus */
    id: number;
    /** Bus number used for operational identification and display */
    busNumber: number;
    /** Vehicle license plate number */
    licensePlate: string;
    /** Manufacturer brand of the bus (e.g., Mercedes, Volvo, Scania) */
    brand: string;
    /** Description of bus features and characteristics (e.g., "Air conditioning, WiFi, Reclining seats") */
    characteristics: string;
    /** Whether the bus is currently active and available for service */
    isActive: boolean;
    /** ISO 8601 timestamp indicating when the bus record was created */
    createdAt: string;
}