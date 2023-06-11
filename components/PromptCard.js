import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function PromptCard() {
  const router = useRouter()
  // console.log("router: >>>>>>>>>>", router)

  return (
    <div>PromptCard</div>
  )
}
