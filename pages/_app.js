import "@/styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Nav from "@/components/Nav"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Nav />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
