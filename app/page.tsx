import React from "react";
import Image from "next/image";
import DataTable from "@/components/DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

const Page = () => {
  const trendingCoins: TrendingCoin[] = [
    {
      item: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        market_cap_rank: 1,
        thumb: "/logo.svg",
        large: "/logo.svg",
        data: {
          price: 89113.0,
          price_change_percentage_24h: {
            usd: 2.5,
          },
        },
      },
    },
    {
      item: {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        market_cap_rank: 2,
        thumb: "/logo.svg",
        large: "/logo.svg",
        data: {
          price: 2456.78,
          price_change_percentage_24h: {
            usd: -1.2,
          },
        },
      },
    },
    {
      item: {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        market_cap_rank: 3,
        thumb: "/logo.svg",
        large: "/logo.svg",
        data: {
          price: 123.45,
          price_change_percentage_24h: {
            usd: 5.7,
          },
        },
      },
    },
    {
      item: {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        market_cap_rank: 4,
        thumb: "/logo.svg",
        large: "/logo.svg",
        data: {
          price: 0.345,
          price_change_percentage_24h: {
            usd: -0.8,
          },
        },
      },
    },
    {
      item: {
        id: "polygon",
        name: "Polygon",
        symbol: "MATIC",
        market_cap_rank: 5,
        thumb: "/logo.svg",
        large: "/logo.svg",
        data: {
          price: 0.567,
          price_change_percentage_24h: {
            usd: 3.1,
          },
        },
      },
    },
  ];

  return (
    <main className="main-container p-6">
      <section className="home-grid">
        <div id="coin-overview" className="mb-8">
          <div className="header flex items-center gap-4">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
              width={56}
              height={56}
            />
            <div className="info">
              <p className="name text-gray-500">BitCoin / BTC</p>
              <h1 className="text-3xl font-bold">$89,113.00</h1>
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
