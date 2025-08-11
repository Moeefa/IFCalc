import { getMessages } from "@/lib/suap";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function MessageData() {
	const data = await getMessages();

	return (
		<DataTable columns={columns} data={data} />
	);
}
