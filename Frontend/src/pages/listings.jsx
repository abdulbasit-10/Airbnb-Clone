import { listings } from "../data";
import Cards from "../components/cards";
export default function SponsoredListings() {
  return (
    <div className="flex flex-col justify-center bg-gray-50">
      <div className="p-4 sm:p-6 w-[95%] bg-white mx-auto mt-10 rounded-2xl cursor-pointer">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-center sm:text-left">
        Sponsored Listings
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-center sm:text-left">
        Featured AI tools and services{" "}
        <span className="text-green-600 font-medium rounded-2xl py-1 px-2 bg-green-200">Promoted</span>
      </p>
      <Cards data={listings} />
    </div>
    </div>
  );
}