import { Suspense } from "react";
import Loading from "./components/loading";
import { Products } from "./components/pages/products";
import { IFilter } from "./types/types";

export default function Home({ searchParams }: {searchParams: IFilter}) {
  return (
    <main className="flex min-h-screen flex-col items-center pt-7 pb-7 px-5 ">
      <Suspense fallback={<Loading />}>
        <Products filters={searchParams}/>
      </Suspense>
    </main>
  )
}