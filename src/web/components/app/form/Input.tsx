import React, { useId } from "react";
import classNames from "classnames";
import ExclamationIcon from "../icons/exclamation";

const Input = React.forwardRef<
  HTMLInputElement,
  { errorText?: string; label: string } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ errorText, label, ...inputProps }, ref) => {
  const id = useId();

  return (
    <div className="block text-left mb-1">
      <label htmlFor={id} className="block text-sm font-medium text-discordgray-300">
        {label}
      </label>
      <div className="block mt-1 relative rounded-md shadow-sm">
        <input
          ref={ref}
          id={id}
          {...inputProps}
          className={classNames(
            "block",
            "w-full",
            "bg-discordgray-900",
            "py-3",
            "px-4",
            "pr-10",
            "border",
            {
              "border-discordgray-600": !Boolean(errorText),
              "text-discordgray-50": !Boolean(errorText),
              "placeholder-discordgray-500": !Boolean(errorText),
              "focus:ring-indigo-500": !Boolean(errorText),
              "focus:border-indigo-500": !Boolean(errorText),
            },
            {
              "border-red-500": Boolean(errorText),
              "text-red-500": Boolean(errorText),
              "placeholder-red-300": Boolean(errorText),
              "focus:ring-red-500": Boolean(errorText),
              "focus:border-red-500": Boolean(errorText),
            },
            "focus:outline-none",
            "sm:text-sm",
            "rounded-md"
          )}
          aria-invalid={errorText ? "true" : "false"}
          aria-describedby={`${id}-error`}
        />
        {errorText && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-700">
            <ExclamationIcon />
          </div>
        )}
      </div>
      {errorText && (
        <p className="mt-2 text-sm text-red-700" id={`${id}-error`}>
          {errorText}
        </p>
      )}
    </div>
  );
});
Input.displayName = "Input";

export default Input;
