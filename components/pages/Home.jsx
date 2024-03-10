import HomeContent from "@/components/ui/HomeContent";
import Meta from "../core/Meta";
import { server } from "@/lib/config";

const Home = () => {
	return (
		<>
			<Meta
				title=""
				description="Quran Live Radio and Audio"
				url={server}
				image={`${server}/img/logo/quran-radio-social.png`}
				type="website"
			/>
			<HomeContent />
		</>
	);
};

export default Home;
