import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "success" | "error";
  additionnalClassname?: string;
}

const InputText: React.FC<InputTextProps> = ({
  variant = "primary",
  additionnalClassname,
  ...props
}) => {
  const v =
    variant === "primary"
      ? "dark:focus:border-primary-500 focus:border-primary-500"
      : variant === "success"
      ? "dark:focus:border-green-500 focus:border-green-500"
      : variant === "error" && "dark:focus:border-red-500 focus:border-red-500";

  let classname = classNames(
    "border border-gray-300 dark:border-dark-400 px-3 py-2 rounded-xl text-black dark:text-white bg-white dark:bg-dark-500 focus:outline-none dark:focus:border-primary-500 focus:border-primary-500 duration-200 transition-colors ease-in-out",
    v,
    additionnalClassname
  );

  if (props.className) classname = props.className;

  return <input className={classname} {...props}></input>;
};

InputText.propTypes = {
  //
};

export default InputText;
