export default function AboutContent() {
	return (
		<div className="pb-4">
			<p className="text-center mb-2">Quran Radio</p>
			<p>
				Discover the beauty of Quranic recitations with Qurn.radio, a platform
				that provides a diverse range of live radio and reciters. Immerse
				yourself in the authenticity of real-time broadcasts in the Live mode,
				or enjoy the serenity of recorded recitations in the Reciters mode.
				Additionally, enjoy the convenience of saving favorites and tracking
				your previous listening sessions. Explore the beauty of the Quran at
				your fingertips.
			</p>
			<div className="mt-4">
				<p>
					Developed and maintain by Deeni Info Tech - A non-profit Software
					Development organization to spread the message of Islam worldwide.
				</p>
				<br />
				<p>
					Deeni Info Tech working for the following three sets of goals:
					{/*TODO: Improve design and content*/}
					<ol style={{ marginLeft: `35px` }}>
						<li style={{ listStyleType: `unset`, lineHeight: `1.8` }}>
							Applications for Scholars & Da&apos;wah organizations
						</li>
						<li style={{ listStyleType: `unset`, lineHeight: `1.8` }}>
							Applications for Non-Muslim Countries
						</li>
						<li style={{ listStyleType: `unset`, lineHeight: `1.8` }}>
							Develop Islamic applications
						</li>
					</ol>
				</p>

				<br />
				<p>
					The primary goal of Deeni Info Tech is to create more promising
					Islamic applications. All our applications is/will be free of charge
					and entirely ad-free.
				</p>

				<br />
				<span>Website: </span>
				<a
					className="underline text-black"
					href="https://www.deeniinfotech.com/"
					target="_blank">
					www.DeeniInfoTech.com
				</a>
			</div>
			<div className="mt-4">
				<span>Email: </span>
				<a
					className="underline text-black"
					href="mailto:info@deeniinfotech.com"
					target="_blank">
					info@deeniinfotech.com
				</a>
			</div>
		</div>
	);
}
