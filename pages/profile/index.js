import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Profile from "@/components/Profile"
import Loading from "@/components/Loading"

export default function MyProfile() {
  const router = useRouter()
  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session?.user.id) {
      getMyPosts()
    }
  }, [session?.user.id])

  async function getMyPosts() {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${session.user.id}/prompts`)
      const { prompts } = await response.json()
      console.log("my prompts: >>>>>>>>>>", prompts)
      setMyPosts(prompts)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        })
        const filteredPosts = myPosts.filter((item) => item._id !== post._id)
        setMyPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>My Profile | Promptopia-0</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <Profile
          name="My"
          description="Welcome to your personalized profile page"
          data={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

// SSR route guard
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  console.log("server session: >>>>>>>>", session)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    // props: {
    //   session,
    // },
    props: {},
  }
}
