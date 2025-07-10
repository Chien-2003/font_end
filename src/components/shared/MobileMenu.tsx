import NavLinks from "../ui/NavLinks";

export default function MobileMenu() {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pt-2 pb-3">
        <NavLinks />
      </div>
    </div>
  );
}
