"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";

import useCart from "@/hooks/use-cart";
import Summary from "./components/sumary";
import CartItem from "./components/cart-item";



const CartPage = () => {

  const [isMounted, SetIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    SetIsMounted(true)
  },[])

  if(!isMounted) {
    return null;
  }

  return ( 
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Tienda de Carrito</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {
                cart.items.length === 0 && <p
                 className="text-neutral-500">No hay artículos agregados</p>
              }
              <ul>
                {cart.items.map((item) => (
                  <CartItem 
                    key={item.id}
                    data={item}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
   );
}
 
export default CartPage;