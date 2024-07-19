/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import { Product } from "../types/types"

export const Card = ({product}: {product: Product}) => {
  return (<div className="flex justify-center flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="rounded-t-lg max-h-[200px] min-h-[200px] m-2 relative">
        <Image style={{objectFit: "contain"}} src={product.thumbnail} alt="" fill sizes="200px" priority />
    </div>
    <div className="p-5 h-full">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        </a>
        <p className="mb-3 text-lg font-medium text-green-800 dark:text-green-400 break-all">€ {product.price}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Category: <span className="text-green-800 dark:text-green-400 break-all">{product.category || "-"}</span><br />
            Rating: <span className="text-green-800 dark:text-green-400 break-all">{product.rating ? Math.round(product.rating) : "-"} ★</span>
        </p>
    </div>
</div>)
}