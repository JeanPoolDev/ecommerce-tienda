'use client';

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("es-PE",{
  style: 'currency',
  currency: 'PEN'
});

interface CurrencyProps{
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value
}) => {
  const [isMounted, SetIsMounted] = useState(false);

  useEffect(() => {
    SetIsMounted(true);
  },[]);

  if(!isMounted){
    return null;
  }

  return ( 
    <div className="font-semibold">
      {formatter.format(Number(value))}
    </div>
   );
}
 
export default Currency;