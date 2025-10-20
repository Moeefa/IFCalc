import { DataWrapper } from "@/components/common/data-wrapper";
import HomeworkData from "./data";
import Loading from "./loading";

export default async function Page() {
	return (
		<DataWrapper
			loading={<Loading />}
			requireAuth
			unauthenticatedMessage="Faça o login com a conta do seu SUAP para ver os seus trabalhos e aproveitar todas as funcionalidades do sistema!"
		>
			<div className="flex sm:flex-row flex-col gap-4 w-full">
				<HomeworkData />
			</div>
		</DataWrapper>
	);
}
