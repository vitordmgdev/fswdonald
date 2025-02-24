import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers/format-currency";

import { CartProduct } from "../contexts/cart";

interface CartItemProps {
    product: CartProduct
}

const CartProductItem = ({product}: CartItemProps) => {
    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                    <div className="flex items-center gap-1">
                        <Button className="w-7 h-8 rounded-lg" variant="outline">
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <p className="w-8 text-center text-xs">{product.quantity}</p>
                        <Button className="w-7 h-8 rounded-lg" variant="destructive">
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            <Button className="w-7 h-7 rounded-lg" variant="outline">
                <TrashIcon />        
            </Button>
        </div>
    );
}
 
export default CartProductItem;