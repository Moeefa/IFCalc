"use server";

import { revalidateTag } from "next/cache";

export async function revalidate() {
	revalidateTag("suap_fetch");
}
