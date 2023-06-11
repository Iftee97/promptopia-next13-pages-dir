import Head from "next/head"
import { useRouter } from "next/router"
import { useSession, getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

export default function MyProfile() {
  const router = useRouter()
  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([])

  return (
    <>
      <Head>
        <title>My Profile | Promptopia-0</title>
      </Head>

      <div>MyProfile</div>
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
    props: {
      session,
    },
  }
}
