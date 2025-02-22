"use client";

import { Prisma } from "@prisma/client";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{ include: {restaurant: {
        select: {
            name: true,
            avatarImageUrl: true
        }
    }}}>
}    

const ProductDetails = ({product}: ProductDetailsProps) => {
    const [ quantity, setQuantity ] = useState<number>(1)

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if(prev === 1) {
                return 1;
            }

            return prev - 1
        })
    }

    const handleIncreaseQuantity  = () => {
        setQuantity((prev) => {
            if(prev === 99) {
                return 99
            }

            return prev + 1
        })
    }

    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl py-5 px-5 flex flex-auto flex-col">
            <div className="flex-auto">
                <div className="flex items-center gap-1">
                    <Image
                    src={product.restaurant.avatarImageUrl}
                    alt={product.restaurant.name}
                    height={16}
                    width={16}
                    className="rounded-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </p>
                </div>
                <h2 className="text-xl mt-1 font-semibold">{product.name}</h2>
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}
                    </h3>
                    <div className="flex items-center gap-3 text-center mt-3">
                        <Button variant="outline" className="h-8 w-8 rounded-xl"
                        onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon />
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl"
                        onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <ScrollArea>
                    <Scrollbar orientation="vertical" />
                    <div className="h-[200px] overflow-hidden">
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-1">
                                <ChefHatIcon size={18} />
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul>
                                {
                                    product.ingredients.map((ingredient, index) => {
                                        return (
                                            <li key={index}>
                                                <p className="text-muted-foreground text-sm">
                                                    - {ingredient}
                                                </p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                </ScrollArea>
            </div>
            <Button className="mt-6 w-full rounded-full">Adicionar à sacola</Button>
        </div>
     );
}
 
    export 

default ProductDetails;