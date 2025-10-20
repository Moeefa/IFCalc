import { DataWrapper } from "@/components/common/data-wrapper";
import MaterialData from "./data";
import Loading from "./loading";

export default async function DemoPage() {
	return (
		<div className="w-full h-full">
			<DataWrapper
				loading={<Loading />}
				requireAuth
				unauthenticatedMessage="Faça o login com a conta do seu SUAP para ver as mensagens e aproveitar todas as funcionalidades do sistema!"
			>
				<MaterialData />
			</DataWrapper>
		</div>
	);
}
