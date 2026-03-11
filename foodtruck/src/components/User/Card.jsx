import React from 'react'

const Card = (props) => {
    const { resName, cuisines, rating, resImage, address } = props;
    return (
       <div className='p-4 w-72 cursor-pointer group'>
    <div className="rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
            <img
                src={resImage}
                alt={resName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Optional offer badge - show if offer exists */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="text-white font-bold text-sm tracking-wide">60% OFF UPTO ₹120</span>
            </div> */}
        </div>

        {/* Info Section */}
        <div className="p-3 bg-white">
            <h2 className="font-bold text-gray-900 text-base truncate">
                {resName}
            </h2>

            {/* Rating + Time Row */}
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <span className="text-green-600">⭐</span>
                <span className="font-semibold text-gray-800">{rating?.avg ?? 0}</span>
                <span className="text-gray-400">•</span>
                <span>30-35 mins</span>
            </div>

            {/* Cuisines */}
            <p className="text-sm text-gray-500 mt-1 truncate">
                {cuisines}
            </p>

            {/* Location */}
            <p className="text-sm text-gray-400 mt-0.5 truncate">
                {address?.city}
            </p>

            {/* Divider */}
            {/* <div className="border-t border-dashed border-gray-200 mt-3" /> */}

            {/* Offer tag (optional) */}
            {/* <p className="text-xs text-orange-500 font-semibold mt-2">
                🏷 Items starting at ₹99
            </p> */}
        </div>
    </div>
</div>
    )
}

export default Card