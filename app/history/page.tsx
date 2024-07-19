'use client';

import Loading from "../components/loading";
import { Button } from "../components/button";
import { historyTable } from "@/database.config";
import { IHistory } from "../types/types";
import useSWR from "swr";
import moment from "moment";

export default function History() {
  const { data, isLoading, mutate } = useSWR("history", () => historyTable.toArray() as Promise<(IHistory & {id: number})[]>);
  const deleteHistory = async () => {
    await historyTable.clear();
    mutate([]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-7 pb-7 px-5">
      {isLoading && <Loading />}
      {!isLoading && data && <>
        {data.length > 0 && <>
          <Button title="Delete history" className="mb-5" onClick={deleteHistory}/>
          <span className="text-lg mb-5" >History</span>
          {data.map((search) => <Card key={search.id} history={search}/>)}
        </>}
        {data.length === 0 && <span className="text-lg mb-5" >History is empty</span>}
      </>}
    </main>
  )
}

export const Card = ({history}: {history: IHistory & { id: number }}) => {
  const green = "font-bold text-green-800 dark:text-green-400 break-all";
  return(
    <div className="p-4 mb-4 text-sm rounded-lg dark:text-white text-gray-800 bg-green-50 dark:bg-gray-800 w-[70%] max-md:w-full" role="alert">
      <span className={green}>{moment(history.createdAt).format("DD/MM/YYYY HH:mm")}</span> -{" "}
      Search: <span className={green}>{history.search || "-"}</span>{" / "}
      Rating: <span className={green}>{history.rating || "-"}</span>{" / "}
      Min Price: <span className={green}>{history.minPrice || "-"}</span>{" / "}
      Max Price: <span className={green}>{history.maxPrice || "-"}</span>
    </div>
)}