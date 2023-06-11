import Image from "next/image"

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center">
      <Image
        src="/assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  )
}
