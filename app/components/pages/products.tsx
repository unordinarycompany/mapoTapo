import { IFilter, Product } from "@/app/types/types";
import { Card } from "../card";
import React from "react";

const getProducts = async (filters?: IFilter): Promise<Product[]> => {
  return fetch(`https://dummyjson.com/products${filters?.search ? "/search?" : ""}${new URLSearchParams({ 
    ...(filters?.search && { q: filters.search })
  })}`, {cache: "no-store"})
  .then(res => res.json())
  .then(data => data.products
    .filter((product: Product) => !filters?.rating || (product.rating && Math.round(product.rating) >= filters.rating))
    .filter((product: Product) => !filters?.minPrice || (product.price && product.price >= filters.minPrice))
    .filter((product: Product) => !filters?.maxPrice || (product.price && product.price <= filters.maxPrice))
  )
  .catch(() => [])
}

export const Products = async ({ filters }: {filters: IFilter}) => {
  const result = await getProducts(filters);

  if(!result || result.length === 0) return <span className="text-lg mb-5" >Not products found</span>
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 xxxl:grid-cols-6 gap-4">
      {(result || []).map((product: Product) => (
        <React.Fragment key={product.id}>{product && <Card product={product}/>}</React.Fragment>
      ))}
    </div>
  )
}