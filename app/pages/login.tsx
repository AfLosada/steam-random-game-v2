import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export type User = {
	steamID: string;
	avatar: {
		small: string;
		medium: string;
		large: string;
		hash: string;
	};
	url: string;
	visible: boolean;
	personaState: number;
	personaStateFlags: number;
	allowsComments: boolean;
	nickname: string;
	lastLogOffTimestamp: number;
	createdTimestamp: number;
	realName: string;
	primaryGroupID: string;
	countryCode: string;
	stateCode: string;
};

export function LoginPage() {
	const navigate = useNavigate();
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-4 justify-center">
						<Button
							className="bg-transparent"
							variant="link"
							onClick={() => navigate("/auth/steam")}
						>
							<img
								src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_02.png"
								alt="Steam Login Icon"
							/>
						</Button>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block min-w-0 min-h-0">
				<img
					src="https://ui.shadcn.com/placeholder.svg"
					alt="test"
					className="min-w-0 min-h-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
