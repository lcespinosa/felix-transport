import Head from "next/head";
import Navbar from "./components/Navbar";

const appName = process.env.NEXT_PUBLIC_APP_NAME;

export default function AppShell({
                                   title,
                                   children
                                 }) {

  return <>
    <Head>
      <title>{`${title} - ${appName}`}</title>
    </Head>
    <Navbar/>
    <section className="max-w-6xl mx-auto p-10">
      {children}
    </section>
  </>
}

AppShell.defaultProps = {
  title: "Untitled",
}
