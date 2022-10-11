import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "default" | "outline";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  shape = "default",
  loading,
  children,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={classNames(
        "px-3 py-2 rounded-xl",
        shape === "default"
          ? "bg-primary-500 hover:bg-primary-400 text-white"
          : "border border-primary-500 hover:border-primary-400",
        "w-full transition-colors duration-200 ease-in-out"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  //
};

export default Button;
