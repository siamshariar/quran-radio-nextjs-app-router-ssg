import Link from "next/link";
import styles from "./Header.module.css";
import { IonIcon, IonMenuToggle } from "@ionic/react";
import { LocalStore } from "@/store/local";
import { MoreVert } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { PlayerStore, setSliderDown } from "@/store";
import ShareModal from "../actions/share-modal";
import { server } from "@/lib/config";
import {
	hamburger,
	homeOutline,
	musicalNote,
	musicalNoteOutline,
	starOutline,
} from "@/icons";
import {
	peopleOutline,
	informationCircleOutline,
	helpCircleOutline,
	heartOutline,
} from "ionicons/icons";
import SideNav from "./Sidenav";

const HeaderHome = () => {
	const isTab = LocalStore.useState((s) => s.isTab);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const [shareOpen, setShareOpen] = useState(false);
	const [sideNavOpen, setSidenavOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuClick = () => {
		setSliderDown(true);
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleShareClose = () => {
		setShareOpen(false);
	};

	const handleShareOpen = () => {
		setShareOpen(true);
		setSidenavOpen(false);
	};

	const toggleMobileNav = (open) => {
		setSidenavOpen(open);
	};

	return (
		<div className={styles.header}>
			<div className="page_width">
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.left}>
							{isTab ? (
								<IonMenuToggle>
									<div className={styles.menu_btn}>
										<IonIcon
											icon={hamburger}
											slot="start"
											class={styles.icon}
										/>
										{/* <IconButton>
											<Hamburger />
										</IconButton> */}
									</div>
								</IonMenuToggle>
							) : (
								<div
									className={styles.menu_btn}
									onClick={() => setSidenavOpen(true)}>
									<IonIcon icon={hamburger} slot="start" class={styles.icon} />
								</div>
							)}
						</div>
						<div className={styles.logo}>
							<div className={styles.title}>
								<Link href="/">
									<img src="/img/logo/logo.png" alt="" />
								</Link>
							</div>
						</div>
						<div className={styles.right}>
							<div
								className={isTab ? `${styles.btn} invisible` : `${styles.btn}`}>
								<IconButton onClick={handleClick}>
									<MoreVert />
								</IconButton>
							</div>
						</div>

						<Popover
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							disableScrollLock={true}>
							<MenuList className={styles.menu}>
								<Link href="/about">
									<MenuItem onClick={handleMenuClick}>
										<span className={styles.icon}>
											<IonIcon icon={informationCircleOutline} slot="start" />
										</span>
										<span className={styles.text}>About</span>
									</MenuItem>
								</Link>
								<Link href="/support">
									<MenuItem onClick={handleMenuClick}>
										<span className={styles.icon}>
											<IonIcon icon={helpCircleOutline} slot="start" />
										</span>
										<span className={styles.text}>Support</span>
									</MenuItem>
								</Link>

								{/* <Divider />
							<MenuItem onClick={handleMenuClick} className={styles.footer}>
								<div>
									<span>Powered by - </span>
									<a href="https://www.deeniinfotech.com/" target="_blank">
										Deeni Info Tech
									</a>
								</div>
							</MenuItem> */}
							</MenuList>
						</Popover>

						<ShareModal
							openModal={shareOpen}
							closer={handleShareClose}
							url={`${server}`}
							title="Quran Radio"
						/>
						<SideNav
							navOpen={sideNavOpen}
							navControl={toggleMobileNav}
							openShare={handleShareOpen}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderHome;
