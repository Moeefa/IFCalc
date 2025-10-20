import { DataWrapper } from "@/components/common/data-wrapper";
import Loading from "./loading";
import ScheduleData from "./data";

export default async function Page() {
	return (
		<DataWrapper
			requireAuth
			loading={<Loading />}
			unauthenticatedMessage="Faça o login com a conta do seu SUAP para ver o seu horário!"
		>
			<ScheduleData />
		</DataWrapper>
	);
}
