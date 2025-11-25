import { getMaterials, getSuapProvider } from "@/lib/suap";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function MaterialData() {
  const data = await getMaterials();
  const provider = await getSuapProvider();

  return <DataTable columns={columns} data={data} provider={provider} />;
}
