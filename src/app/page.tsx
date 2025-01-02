import BestDeals from "@/components/best.deals";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <BestDeals />
    </main>
  );
}
