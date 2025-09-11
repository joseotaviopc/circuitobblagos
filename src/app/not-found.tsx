"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

 
export default function NotFound() {
    const router = useRouter()
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            // router.push("/")
        }, 2_000)
        
        return () => clearTimeout(timeout)
    }, [])

  return (
    <div className='flex flex-col items-center py-20 gap-5'>
      <Image src="/bb-lagos.png" alt="BB Lagos" width={100} height={100} />
      <h2>Ihhh, perdeu a onda...</h2>
      <p>Não encontramos a página que você está procurando.</p>
      <p>Redirecionando para a página inicial <span className="animate-pulse">...</span></p>
    </div>
  )
}