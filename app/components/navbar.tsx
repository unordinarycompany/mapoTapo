'use client';

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { historyTable } from "@/database.config";
import { IHistory } from "../types/types";
import moment from "moment";
import { Filters } from "./filter";

export const Navbar = () => {  
  return(
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 left-0 w-full z-10">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Search App</span>
        <SearchInput />
        <div className="items-center justify-between w-full md:w-auto md:order-1" id="navbar-search">
          <Links />
        </div>
      </div>
    </nav>
  )
}

const Links = () => {
  const pathname = usePathname();
  const active = "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark:text-green-500";
  const noActive = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  return(
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link href="/" className={`${pathname === "/" ? active : noActive}`}>Home</Link>
      </li>
      <li>
        <Link href="/history" className={`${pathname === "/history" ? active : noActive}`} >History</Link>
      </li>
    </ul>
  )
}

const SearchInput = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState<string>(params.get("search") || "");
  const router = useRouter();
  
  const handleSearch = async () => {
    if(search || params.get("rating") || params.get("minPrice") || params.get("maxPrice")){
      await historyTable.add({
        search: search,
        rating: params.get("rating") ? Number(params.get("rating")) : undefined,
        minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
        maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
        createdAt: moment().toISOString()
      } as IHistory);
      router.push(`/?${new URLSearchParams({
        ...(search && { search: search }),
        ...(params.get("rating") && { rating: params.get("rating") || undefined }),
        ...(params.get("minPrice") && { minPrice: params.get("minPrice") || undefined }),
        ...(params.get("maxPrice") && { maxPrice: params.get("maxPrice") || undefined })
      })}`);
    } else
      router.push(`/`);
  }

  const handleClear = () => {
    setSearch("");

    if(params.get("rating") || params.get("minPrice") || params.get("maxPrice")){
      router.push(`/?${new URLSearchParams({
        ...(params.get("rating") && { rating: params.get("rating") || undefined }),
        ...(params.get("minPrice") && { minPrice: params.get("minPrice") || undefined }),
        ...(params.get("maxPrice") && { maxPrice: params.get("maxPrice") || undefined })
      })}`);
    } else {
      router.push(`/`);
    }
  }

  useEffect(() => {
    if(params.get("search") !== search) setSearch(params.get("search") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return(<div className="flex order-2 h-10 mt-0 max-md:mt-4 max-md:w-full">
    {pathname === "/" && <Filters />}
    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="search-navbar" className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search..." />
    <Button title="Go" onClick={handleSearch} className="ml-4"/>
    {pathname === "/" && <Button primary={false} title="Clear" onClick={handleClear} className="ml-4"/>}
  </div>)
}