import ActionButton from "./ActionButton";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-2xl px-2" href="/">
          Money Diary
        </a>
      </div>
      <div className="navbar-end flex items-center gap-8">
        <ActionButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
