import Link from "next/link";
import classNames from "classnames";
import {
	peopleOutline,
	informationCircleOutline,
	helpCircleOutline,
	heartOutline,
	fileTrayFullOutline,
	radioOutline,
} from "ionicons/icons";
import {
	homeOutline,
	musicalNoteOutline,
	starOutline,
	musicalNote,
	settingsOutline,
	share,
} from "@/icons";
import {
	PlayerStore,
	setChapter,
	setSrc,
	setPlaying,
	setSliderDown,
} from "@/store";
import styles from "./Menu.module.css";
import {
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonList,
	IonMenu,
	IonMenuToggle,
} from "@ionic/react";
import Share from "../actions/share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const menus = [
	{
		title: "Home",
		icon: homeOutline,
		url: "/",
	},
	{
		title: "Reciters",
		icon: peopleOutline,
		url: "/reciters",
	},
	{
		title: "Chapters",
		icon: musicalNoteOutline,
		url: "/chapters",
	},
	{
		title: "Live Radios",
		icon: radioOutline,
		url: "/live-radio",
	},
	{
		title: "Favorites",
		icon: heartOutline,
		url: "/favorites",
	},
	{
		title: "Recents",
		icon: fileTrayFullOutline,
		url: "/recent",
	},
	{
		title: "About",
		icon: informationCircleOutline,
		url: "/about",
	},
	{
		title: "Support",
		icon: helpCircleOutline,
		url: "/support",
	},
	// {
	// 	title: "Settings",
	// 	icon: settingsOutline,
	// 	url: "/settings",
	// },
	{
		title: "share",
	},
];

const Menu = () => {
	const reciterId = PlayerStore.useState((s) => s.reciterId);

	return (
		<IonMenu
			side="start"
			contentId="main-content"
			menuId="main-menu"
			class={styles.menu}>
			<IonHeader class={styles.header}>
				<div className={styles.logo}>
					<div className={styles.title}>
						<Link href="/">
							<img src="/img/logo/logo.png" alt="" />
						</Link>
					</div>
				</div>
			</IonHeader>
			<IonContent class={styles.content}>
				<IonList class={styles.list}>
					{menus.map((m, k) =>
						m.title === "share" ? (
							<IonMenuToggle auto-hide={false} key={k}>
								<IonItem detail={false} lines="none" class={styles.item}>
									<Share
										key={k}
										Icon={ShareOutlinedIcon}
										shareText="Share"
										url="/"
										title="Quran Radio"
									/>
								</IonItem>
							</IonMenuToggle>
						) : (
							<IonMenuToggle
								auto-hide={false}
								key={k}
								onClick={() => setSliderDown(true)}>
								<Link
									href={
										m.url === "/chapters" ? `/reciters/${reciterId}` : m.url
									}>
									<IonItem detail={false} lines="none" class={styles.item}>
										<IonIcon icon={m.icon} slot="start" class={styles.icon} />
										{m.title}
									</IonItem>
								</Link>
							</IonMenuToggle>
						)
					)}
				</IonList>
			</IonContent>

			<div className={classNames(styles.footer, "p-4 text-base")}>
				<span>Powered by - </span>
				<IonMenuToggle auto-hide={false} class="md">
					<a target="_blank" href="https://www.deeniinfotech.com/">
						Deeni Info Tech
					</a>
				</IonMenuToggle>
			</div>
		</IonMenu>
	);
};

export default Menu;
