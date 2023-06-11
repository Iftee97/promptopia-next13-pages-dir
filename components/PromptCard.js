import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathName = router.pathname

  const [copied, setCopied] = useState("")

  function handleCopy() {
    navigator.clipboard.writeText(post.prompt)
    setCopied(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  function handleProfileClick() {
    console.log("post: >>>>>>>>>", post)
    if (post.creator._id === session?.user.id) {
      return router.push("/profile")
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div
          className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
          onClick={handleCopy}
        >
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.includes("#") ? post.tag : `#${post.tag}`}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
