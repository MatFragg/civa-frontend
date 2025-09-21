/**
 * Logo component for the CIVA transportation company.
 * Displays the company logo as a clickable link that navigates to the home page.
 * Includes proper accessibility attributes and responsive sizing.
 * 
 * @returns TSX element representing the CIVA logo with navigation functionality
 * 
 */
export const Logo = () => (
  <a href="/" aria-label="CIVA - Inicio" className="block">
    <img
      src="https://imgs.search.brave.com/hduxU29zO4Rffgw4CNZ8ae6EM3Z7Yaj0BNKFGB05tqw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/c2VudmVjdG9yLmNv/bS9sb2dvL2ltZy9s/b2dvLXRyYW5zcG9y/dGVzLWNpdmEtMzgw/MjIucG5n"
      alt="CIVA"
      className="h-16 w-auto"
    />
  </a>
);