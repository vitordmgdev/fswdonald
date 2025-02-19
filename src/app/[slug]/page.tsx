import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{slug: string}>
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug)

    if(!restaurant) {
        return notFound()
    }
    
    return <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
        {/* LOGO E TITULO */}
        <div className="flex flex-col items-center gap-2">
            <Image 
            src={restaurant?.avatarImageUrl} 
            alt={restaurant?.name} 
            width={82} 
            height={82} />
            <h2 className="font-semibold">
                {restaurant?.name}
            </h2>
        </div>
        {/* BEM VINDO */}
        <div className="pt-24 text-center space-y-2">
            <h3 className="text-2xl font-semibold">
                Seja bem-vindo!
            </h3>
            <p className="opacity-55">
                Escolha como prefirir a sua refeição. Estamos oferecendo praticidade e sabor em cada detalhe!
            </p>
        </div>
        <div className="pt-14 grid grid-cols-2 gap-4">
            <ConsumptionMethodOption 
            slug={slug}
            imageUrl="/dine_in.png"
            imageAlt="Para comer aqui"
            buttonText="Para comer aqui"
            option="DINE_IN"
            />
            
            <ConsumptionMethodOption 
            slug={slug}
            imageUrl="/take_away.png"
            imageAlt="Para levar"
            buttonText="Para levar" 
            option="TAKEAWAY"
            />
            
        </div>
    </div>;
}
 
export default RestaurantPage;