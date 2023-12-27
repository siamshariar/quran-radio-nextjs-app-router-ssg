export default function AboutContent() {
	return (
		// <div className={styles.content}>
		<div>
			<p className="text-center mb-2">Quran Radio</p>
			<p>
				Quran Radio is a collection of good quality Quran recitations on the
				internet. Mp3s on this site may be downloaded and used for personal use
				free of charge. However, you may not use these files for commercial
				purposes as many of these files have rules and regulations that prevent
				their sale except by the publishing companies.
			</p>
			<div className="mt-4">
				<span>Powered by - </span>
				<a
					className="underline"
					href="https://www.deeniinfotech.com/"
					target="_blank">
					Deeni Info Tech.
				</a>
				<span>
					{" "}
					A non-profitable Islamic software development organization for Dawah.
				</span>
			</div>
			<div className="mt-4">
				<span>Email: </span>
				<a
					className="underline"
					href="mailto:deeniinfotech@gmail.com"
					target="_blank">
					deeniinfotech@gmail.com
				</a>
			</div>
		</div>
		// </div>
	);
}
