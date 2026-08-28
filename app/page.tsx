import { headers } from "next/headers";
import HomeClient from "./HomeClient";

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const isHSN = host.startsWith("healthsciencenutritionals");
  return <HomeClient isHSN={isHSN} />;
}
