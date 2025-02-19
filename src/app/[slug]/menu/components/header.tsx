"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}


const RestaurantHeader = ({restaurant}: RestaurantHeaderProps) => {
    const HandleBackClick = () => router.back()
    const router = useRouter()
    return ( 
        <div className="relative h-[250px] w-full">
            <Button
            onClick={HandleBackClick} 
            variant="secondary" 
            size="icon" 
            className="absolute top-4 left-4 rounded-full z-10">
                <ChevronLeftIcon />
            </Button>
            <Image
            src={restaurant.coverImageUrl} 
            alt={restaurant.name} 
            fill 
            className="object-cover" 
            />
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full z-10">
                <ScrollTextIcon />
            </Button>
        </div>
     );
}
 
export default RestaurantHeader;