"use client"

import { Product } from "@prisma/client";
import React, { createContext, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: [];
    toggleCard: () => void;
    addProduct: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCard: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {}
}) 

export const CartProvider = ({children}:{children: React.ReactNode}) => {
    const [ products, setProducts ] = useState<CartProduct[]>([]);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    
    const toggleCart = () => {
        setIsOpen(prev => !prev);
    }

    const addProduct = (product: CartProduct) => {

        const productIsAlreadyOnTheCart = products.some(
            (prevProducts) => prevProducts.id === product.id
        )
        if(!productIsAlreadyOnTheCart){
            return setProducts((prev) => [...prev, product])
        }

        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity
                    }
                }
                return prevProduct
            })
        })
    }

    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if(prevProducts.id === productId) {
                    if(prevProducts.quantity === 1) {
                        return prevProducts
                    }
                    return {...prevProducts, quantity: prevProducts.quantity - 1}
                }
                return prevProducts
            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if(prevProducts.id === productId) {
                    return {...prevProducts, quantity: prevProducts.quantity + 1}
                }
                return prevProducts
            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProducts => prevProducts.id !== productId))
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}