export type Contributor = {
	name: string;
	origin: string;
	description?: string;
	image: string;
	redirect_url: string;
	socials: {
		name: string;
		url: string;
	}[];
};
