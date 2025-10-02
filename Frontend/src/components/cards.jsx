// Cards.jsx 
import { ThumbsUp, Eye } from "lucide-react";

export default function Cards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-300 p-4 py-10 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <img
                src={item.Image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 ml-3 min-w-0">
                <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-yellow-500 font-bold">
                ⭐ {item.rating}
              </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
            <div className="flex flex-col">
              <div variant="outline">{item.category}</div>
              {item.type && (
                <div className="bg-green-100 text-green-700 rounded-2xl w-fit px-2 py-1 text-xs mt-1 font-semibold">
                  {item.type}
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {item.views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> {item.likes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
