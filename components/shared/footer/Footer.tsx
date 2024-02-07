import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-light-gradient dark:bg-dark-secondary-gradient">
      <div className="wrapper flex-between text-white">
        <Link
          href="/"
          className="tracking-wide text-2xl tablet:text-3xl desktop:text-4xl"
        >
          BGloSSary
        </Link>
        <p>©All Rights Reserved</p>
      </div>
    </footer>
  );
};
export default Footer;
