import MessageData from "./data";
import Loading from "./loading";
import { DataWrapper } from "@/components/common/data-wrapper";

export default async function Page() {
	return (
		<div className="w-full h-full">
			<DataWrapper
				loading={<Loading />}
				unauthenticatedMessage="Faça o login com a conta do seu SUAP para ver as mensagens e aproveitar todas as funcionalidades do sistema!"
			>
				<MessageData />
			</DataWrapper>
		</div>
	);
}
