import dynamic from "next/dynamic";
import Head from "next/head";
const Homepage = dynamic(() => import("../components/Homepage"), {
  ssr: false,
});

export default function Index() {
  return <Homepage />;
}
