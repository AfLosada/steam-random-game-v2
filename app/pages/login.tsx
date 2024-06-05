import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export function LoginPage(user: unknown) {
  const navigate = useNavigate();
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-4 justify-center">
						<Button className="bg-transparent w-48 h-42 " variant="link" onClick={() => navigate("/auth/steam")}>
							<img
								className="w-full h-full"
								src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_02.png"
								alt="Steam Login Icon"
							/>
						</Button>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<img
					src="https://ui.shadcn.com/placeholder.svg"
					alt="test"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
