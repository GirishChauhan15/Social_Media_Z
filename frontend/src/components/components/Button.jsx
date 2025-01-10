function Button({
  children,
  bgColor = "bg-[#ff574a]",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 cursor-pointer rounded-lg text-sm sm:text-base md:text-lg lg:text-xl disabled:cursor-not-allowed hover:bg-[#da453b] ${bgColor} ${textColor} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
