export const Footer = () => {
  return(<footer className="bg-white shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="#" className="hover:underline">Search App</a>. All Rights Reserved.</span>
      </div>
  </footer>)
}