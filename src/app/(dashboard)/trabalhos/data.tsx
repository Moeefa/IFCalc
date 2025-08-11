import { getHomeworks, getSuapProvider } from "@/lib/suap";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CalendarComponent from "./calendar";

export default async function MessageData() {
	const homeworks = await getHomeworks();
	const provider = await getSuapProvider();

	return (
		<>
			<CalendarComponent homeworks={homeworks} />
			<DataTable
				columns={columns}
				data={homeworks}
				provider={provider}
			/>
		</>
	);
}
