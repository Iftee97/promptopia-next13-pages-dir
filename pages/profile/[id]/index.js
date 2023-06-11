import Head from "next/head"
import { useRouter } from "next/router"

export default function OthersProfile() {
  const router = useRouter()
  const { id, name } = router.query

  return (
    <>
      <Head>
        <title>{name} | Promptopia-0</title>
      </Head>

      <div>OthersProfile</div>
    </>
  )
}
