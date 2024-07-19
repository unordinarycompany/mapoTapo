export const Button = ({ title, onClick, className, primary = true }: {title: string, onClick?: () => void, className?: string, primary?: boolean}) => {
  const primaryStyle = "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
  const secondaryStyle = "py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";

  return (<button 
    type="button" 
    onClick={onClick} 
    className={`${primary ? primaryStyle : secondaryStyle} ${className || ""}`}>
      {title}
  </button>)}