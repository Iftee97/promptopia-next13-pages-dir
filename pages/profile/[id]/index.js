import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Profile from "@/components/Profile"
import Loading from "@/components/Loading"

export default function OthersProfile() {
  const router = useRouter()
  const { id, name } = router.query

  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      getUserPosts()
    }
  }, [id])

  async function getUserPosts() {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${id}/prompts`)
      const { prompts } = await response.json()
      console.log("other user's prompts: >>>>>>>>>>", prompts)
      setUserPosts(prompts)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{name} | Promptopia-0</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <Profile
          name={name}
          desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
          data={userPosts}
        />
      )}
    </>
  )
}
