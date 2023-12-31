import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession, getSession } from "next-auth/react"
import { Form } from "@/components"

export default function CreatePrompt() {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  async function createPrompt(e) {
    e.preventDefault()
    try {
      setSubmitting(true)
      console.log("post: >>>>>>>>>>>>", {
        userId: session?.user.id,
        prompt: post.prompt,
        tag: post.tag,
      })
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      })
      console.log("response: >>>>>>>>>>>>", response)
      if (response.ok) {
        router.push("/")
      } else {
        return alert(`Something went wrong! ${response.statusText}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
      setPost({
        prompt: "",
        tag: ""
      })
    }
  }

  return (
    <>
      <Head>
        <title>Create Prompt | Promptopia-0</title>
      </Head>

      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  )
}

// // SSR route guard -- not needed since we're using next-auth middleware
// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
