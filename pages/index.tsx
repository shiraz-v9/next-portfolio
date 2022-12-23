import dynamic from "next/dynamic";
import Head from "next/head";
const Homepage = dynamic(() => import("../components/homepage"), {
  ssr: false,
});

export default function Index() {
  return <Homepage />;
}
