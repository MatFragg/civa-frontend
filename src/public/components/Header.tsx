import { Logo } from "./Logo";

/**
 * Header component for the CIVA Bus Management System.
 * Provides a sticky navigation header with the company logo.
 * Uses backdrop blur effect and responsive design.
 * 
 * @returns TSX element representing the application header
 */
export const Header = () => (
  <header className="sticky top-0 z-20 bg-white/90 backdrop-blur shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center h-20">
        <Logo />
      </div>
    </div>
  </header>
);