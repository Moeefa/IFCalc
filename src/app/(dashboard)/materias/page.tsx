import SubjectData from "./data";
import Loading from "./loading";
import { DataWrapper } from "@/components/common/data-wrapper";
import { SubjectLegend } from "@/components/subject/subject-legend";

export default async function Page() {
	return (
		<>
			<DataWrapper
				loading={<Loading />}
				requireAuth
				unauthenticatedMessage="Faça o login com a conta do seu SUAP para ver as suas matérias e aproveitar todas as funcionalidades do sistema!"
			>
				<SubjectData />
			</DataWrapper>
		</>
	);
}
