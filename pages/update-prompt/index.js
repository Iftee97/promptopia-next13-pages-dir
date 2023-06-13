import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { getSession } from "next-auth/react"
import { Form, Loading } from "@/components"

export default function UpdatePrompt() {
  const router = useRouter()
  const { id } = router.query

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      getPromptDetails()
    }
  }, [id])

  async function getPromptDetails() {
    try {
      setLoading(true)
      const response = await fetch(`/api/prompt/${id}`)
      const { prompt } = await response.json()
      console.log("data: >>>>>>>>>>>>", prompt)
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updatePrompt(e) {
    e.preventDefault()
    try {
      setSubmitting(true)
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        tag: "",
      })
    }
  }

  return (
    <>
      <Head>
        <title>Create Prompt | Promptopia-0</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <Form
          type='Edit'
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      )}
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
