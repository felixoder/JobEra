

const Footer = () => {
  return (
    

<footer className="bg-slate-100 rounded-lg shadow m-4 ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-black-500 sm:text-center">©  {new Date().getFullYear()} {"  "}<a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-black">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-black">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-black">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline text-black">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  )
}

export default Footer