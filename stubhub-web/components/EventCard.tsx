
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface EventCardProps {
    image: string;
    title: string;
    date: string;
    location: string;
    price?: number;
}

export default function EventCard({ image, title, date, location, price }: EventCardProps) {
    return (
        <div className="relative group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-gray-200">

                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">Event Image</span>
                    </div>
                )}

                {/* Heart Icon */}
                <div className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="font-bold text-gray-900 leading-tight group-hover:underline">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>
                <p className="text-sm text-gray-500">{location}</p>

                {price && (
                    <div className="mt-2 text-sm font-medium text-gray-900">
                        From ${price}
                    </div>
                )}
            </div>
        </div>
    );
}
