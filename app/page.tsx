import React from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.actions";

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`/coins/${item.id}`} className="flex items-center gap-2">
          <Image
            src={item.large}
            alt={item.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p className="font-medium">{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: (coin) => coin.item.data.price,
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: (coin) => {
      const item = coin.item;
      const change = item.data.price_change_percentage_24h.usd;
      const isTrendingUp = change > 0;

      return (
        <div
          className={cn(
            "flex items-center gap-1",
            isTrendingUp ? "text-green-500" : "text-red-500",
          )}
        >
          {isTrendingUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change.toFixed(2)}%</span>
        </div>
      );
    },
  },
];

const Page = async () => {
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    dex_pair_format: "symbol",
  });

  const trendingResponse = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
  );
  const trendingCoins = trendingResponse.coins;

  return (
    <main className="main-container p-6">
      <section className="home-grid">
        <div id="coin-overview" className="mb-8">
          <div className="header flex items-center gap-4">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </div>

        <p>Trending Coins</p>
        <DataTable
          data={trendingCoins}
          columns={columns}
          rowKey={(coin, index) => coin.item.id}
        />
      </section>

      <section className="w-full mt-7 space-y-4">
        <p className="text-xl font-semibold">Categories</p>
      </section>
    </main>
  );
};

export default Page;
