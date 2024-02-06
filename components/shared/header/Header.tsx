import Navbar from "@/components/shared/header/Navbar";

const Header = () => {
  return (
    <header className="bg-light-gradient dark:bg-dark-gradient">
      <div className="wrapper relative flex-between">
        <span className="text-white tracking-wide text-2xl tablet:text-3xl desktop:text-4xl">
          BGloSSary
        </span>
        <div className="hidden desktop:flex">
          <Navbar />
        </div>
        <div className="hidden desktop:block w-10 h-10 rounded-full bg-white"></div>
      </div>
    </header>
  );
};
export default Header;
