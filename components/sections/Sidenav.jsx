import Link from "next/link";
import Image from "next/image";
import { Drawer } from "@mui/material";
import styles from "./Header.module.css";
import { IonLabel, IonRouterLink } from "@ionic/react";
import { useEffect, useState } from "react";
import {
	peopleOutline,
	informationCircleOutline,
	helpCircleOutline,
	heartOutline,
	shareSocialOutline,
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
	shareOutline,
	donate,
} from "@/icons";
import { IonIcon } from "@ionic/react";
import classNames from "classnames";
// import { PlayerStore } from "@/store";

const pages = [
	{
	  title: "Quran.tube",
	  icon: "/img/icons/quran-tube-icon.svg",
	  iconOutline: "/img/icons/quran-tube-icon.svg",
	  url: " https://www.deeniinfotech.com/p/quran-tube#apps",
	  linkType: "external",
	},
  ];



export default function SideNav(props) {
	// const reciterId = PlayerStore.useState((s) => s.reciterId);
	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = () => {
	  setModalOpen(false);
	};
  
	const openModal = () => {
	  setModalOpen(true);
	};


	return (
		<Drawer
			// transitionDuration={{ enter: 300, exit: 300 }}
			anchor="left"
			open={props.navOpen}
			onClose={() => props.navControl(false)}
			className="mobile-menu-root">
			<div className={styles.mobileMenu}>
				<div className={styles.m_menu_wrap}>
					<div className={styles.m_menu_ctn}>
						<div className={styles.m_menu_top}>
							<Link href="/">
								<div
									onClick={(e) => props.navControl(false)}
									className={styles.m_menu_logo}>
									<Image
										src={`/img/logo/logo.png`}
										alt=""
										width={150}
										height={100}
										style={{
											objectFit: "contain",
											objectPosition: "left center",
										}}
										loading="eager"
										unoptimized
									/>
								</div>
							</Link>
						</div>

						<ul className={styles.m_menu}>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/" className={styles.m_menu_item}>
									<IonIcon
										icon={homeOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Home
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/live-radio" className={styles.m_menu_item}>
									<IonIcon
										icon={radioOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Live Radios
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/reciters" className={styles.m_menu_item}>
									<IonIcon
										icon={peopleOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Reciters
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href={`/chapters`} className={styles.m_menu_item}>
									<IonIcon
										icon={musicalNoteOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Chapters
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/favorites" className={styles.m_menu_item}>
									<IonIcon
										icon={heartOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Favorites
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/recent" className={styles.m_menu_item}>
									<IonIcon
										icon={fileTrayFullOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Recents
								</Link>
							</li>
							{/*TODO: Fix color*/}
							<hr />
							<li onClick={(e) => props.handleShare()}>
								<div className={styles.m_menu_item}>
									<IonIcon
										icon={shareSocialOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Share
								</div>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<Link href="/about" className={styles.m_menu_item}>
									<IonIcon
										icon={informationCircleOutline}
										slot="start"
										class={styles.sidenav_icon}
									/>
									About
								</Link>
							</li>
							<li onClick={(e) => props.navControl(false)}>
								<a
									href="https://www.deeniinfotech.com/donate#donation-form"
									target="_blank"
									className={styles.m_menu_item}>
									<IonIcon
										icon={donate}
										slot="start"
										class={styles.sidenav_icon}
									/>
									Donate
								</a>
							</li>
						</ul>
						<hr />
						<div className={styles.appstitle}>More Apps</div>
						<div className={styles.moremenu}>
						<MenuList pages={pages} openModal={openModal} />
						</div>
					</div>
					

					<div className={classNames(styles.footer, "p-4 text-base")}>
						<span>Powered by - </span>
						<a target="_blank" href="https://www.deeniinfotech.com/">
							Deeni Info Tech
						</a>
					</div>
				</div>
			</div>
		</Drawer>
	);
}
const MenuList = ({ pages, openModal }) => {
	// const location = useLocation();
	const [path, setPath] = useState("/");
  
	useEffect(() => {
	  setPath(location.pathname);
	}, [location]);
  
	return (
	  <div className={styles.list}>
		<a href={pages[0].url} target="_blank" rel="noreferrer">
		  <div className={classNames(styles.item)}>
				<IonIcon
				  icon={pages[0].iconOutline}
				  slot="start"
				  className={styles.icon}
				/>
				<IonLabel className={styles.label}>{pages[0].title}</IonLabel>
				</div>
			  </a>
	  </div>
	);
  };