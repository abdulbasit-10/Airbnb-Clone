import { listings } from "../data";
import Cards from "../components/cards";
export default function SponsoredListings() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto cursor-pointer">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">
        Sponsored Listings
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-center sm:text-left">
        Featured AI tools and services{" "}
        <span className="text-green-600 font-medium rounded-2xl py-1 px-2 bg-green-200">Promoted</span>
      </p>
      <Cards data={listings} />
    </div>
  );
}