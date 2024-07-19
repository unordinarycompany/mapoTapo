'use client';

import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Range } from "./range";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NumberInput } from "./numberInput";
import { historyTable } from "@/database.config";
import moment from "moment";
import { IHistory } from "../types/types";

export const Filters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);

  const [rating, setRating] = useState<number | null>(params.get("rating") ? Number(params.get("rating")) : null);
  const [minPrice, setMinPrice] = useState<number | null>(params.get("minPrice") ? Number(params.get("minPrice")) : null);
  const [maxPrice, setMaxPrice] = useState<number | null>(params.get("maxPrice") ? Number(params.get("maxPrice")) : null);

  const handleFilters = async () => {
    setOpen(false);

    if(params.get("search") || rating || minPrice || maxPrice){
      await historyTable.add({
        search: params.get("search") || undefined,
        rating,
        minPrice,
        maxPrice,
        createdAt: moment().toISOString()
      } as IHistory);
      router.push(`/?${new URLSearchParams({
        ...(params.get("search") && { search: params.get("search") as string }),
        ...(rating && { rating: String(rating) }),
        ...(minPrice && { minPrice: String(minPrice) }),
        ...(maxPrice && { maxPrice: String(maxPrice) })
      })}`);
    } else {
      router.push(`/`);
    }
  }
  
  const handleClear = () => {
    setRating(null);
    setMinPrice(null);
    setMaxPrice(null);

    if(params.get("search"))
      router.push(`/?search=${params.get("search")}`);
    else 
      router.push(`/`);
  }

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if(params.get("rating") != rating) setRating(params.get("rating") ? Number(params.get("rating")) : null);
    if(params.get("minPrice") != minPrice) setMinPrice(params.get("minPrice") ? Number(params.get("minPrice")) : null);
    if(params.get("maxPrice") != maxPrice) setMaxPrice(params.get("maxPrice") ? Number(params.get("maxPrice")) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const filter = (params.get("rating") || params.get("minPrice") || params.get("maxPrice"))
  return (<>
    <button onClick={() => setOpen(true)} type="button" className="mr-4 relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
      </svg>
      {filter && <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900" />}
    </button>

    {open && <Modal open={open} setOpen={setOpen} title="Product Filters" okButtonTitle="Apply" onOk={handleFilters} cancelButtonTitle="Clear Filters" onCancel={handleClear}>
      <>
        <Range label="Min Rating" min={1} max={5} value={rating || undefined} onChange={(value) => setRating(value)} step={1}/>
        <NumberInput label="Min Price" placeholder="100 or 1000 or 10.23" value={minPrice || undefined} onChange={(value) => setMinPrice(value)}/>
        <NumberInput label="Max Price" placeholder="100 or 1000 or 10.23" value={maxPrice || undefined} onChange={(value) => setMaxPrice(value)}/>
      </>
    </Modal>}
  </>)
}