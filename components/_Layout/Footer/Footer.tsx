import React from "react";
import Container from "../Container";
import PropTypes from "prop-types";

type FooterProps = {
  //
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-white dark:bg-dark-600 backdrop-filter backdrop-blur bg-opacity-70">
      <Container>
        <ul className="py-8 text-center">
          <li>
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-bold text-primary-500">BoilerNext </span> -
              A{" "}
              <a
                href="https://nextjs.org/"
                target={"_blank"}
                rel="noreferrer"
                className="hover:text-primary-500 duration-200 transition-colors ease-in-out"
              >
                NextJS
              </a>{" "}
              Boilerplate by{" "}
              <a
                href="https://twitter.com/weetrax"
                target={"_blank"}
                rel="noreferrer"
                className="text-primary-500 hover:text-primary-400 cursor-pointer focus:outline-none"
              >
                @weetrax
              </a>
            </p>
          </li>
        </ul>
      </Container>
    </div>
  );
};

Footer.propTypes = {
  //
};

export default Footer;
