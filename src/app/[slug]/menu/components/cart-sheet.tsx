import { useContext } from "react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"

import { CartContext } from "../contexts/cart";
import CartItem from "./cart-product-item";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CartContext)

    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5">
                    {products.map((product) => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;