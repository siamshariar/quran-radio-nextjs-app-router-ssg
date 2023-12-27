import Link from "next/link";
import { hamburger } from "../../icons";
import styles from "./Header.module.css";
import { IonIcon, IonMenuToggle } from "@ionic/react";
import { LocalStore } from "@/store/local";
import { MoreVert } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { PlayerStore, setSliderDown } from "@/store";
import classNames from "classnames";
import ShareIcon from "@mui/icons-material/Share";
import ShareModal from "../actions/share-modal";
import { server } from "@/lib/config";
import Hamburger from "@/icons/component/hamburger";

const HeaderHome = () => {
	const isTab = LocalStore.useState((s) => s.isTab);
	const reciterId = PlayerStore.useState((s) => s.reciterId);
	const [shareOpen, setShareOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSliderDown(true);
	};

	const open = Boolean(anchorEl);

	const handleShareClose = () => {
		setShareOpen(false);
	};

	const handleShareOpen = () => {
		setShareOpen(true);
		setAnchorEl(null);
	};

	return (
		<div className="page_width">
			<div className={styles.wrapper}>
				<div className={styles.content}>
					{isTab ? (
						<>
							<div className={styles.left}>
								<IonMenuToggle>
									{/* <div className={styles.menu_btn}> */}
									<IconButton>
										{/* <IonIcon
												icon={hamburger}
												slot="start"
												class={styles.icon}
											/> */}
										<Hamburger />
									</IconButton>
									{/* </div> */}
								</IonMenuToggle>
							</div>
							<div className={styles.logo}>
								<div className={styles.title}>
									<Link href="/">
										<img src="/img/logo/logo.png" alt="" />
									</Link>
								</div>
							</div>
							<div className={styles.right}>
								<div className={`${styles.btn} invisible`}>
									{/* <IonIcon icon={settings} slot="start" class={styles.icon} /> */}
									<Link href="/settings">
										<IconButton>
											<SettingsIcon />
										</IconButton>
									</Link>
								</div>
							</div>
						</>
					) : (
						<>
							<div className={styles.logo}>
								<div className={styles.title}>
									<Link href="/">
										<img src="/img/logo/logo.png" alt="" />
									</Link>
								</div>
							</div>
							<div className={styles.right}>
								{/* <div className={styles.btn}>
									<Link href="/settings">
										<IconButton>
											<SettingsIcon />
										</IconButton>
									</Link>
								</div> */}
								<div className={styles.btn}>
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
									<Link href="/">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Home</span>
										</MenuItem>
									</Link>
									<Link href="/reciters">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Reciters</span>
										</MenuItem>
									</Link>
									<Link href={`/reciters/${reciterId}`}>
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Chapters</span>
										</MenuItem>
									</Link>
									<Link href="/live-radio">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Live Radios</span>
										</MenuItem>
									</Link>
									<Link href="/favorites">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Favorites</span>
										</MenuItem>
									</Link>
									<Link href="/recent">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Recents</span>
										</MenuItem>
									</Link>
									<Link href="/about">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>About</span>
										</MenuItem>
									</Link>
									<Link href="/support">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Support</span>
										</MenuItem>
									</Link>
									{/* <Link href="/settings">
										<MenuItem onClick={handleClose}>
											<span className={styles.icon}>
												<HomeOutlinedIcon />
											</span>
											<span className={styles.text}>Settings</span>
										</MenuItem>
									</Link> */}
									<MenuItem onClick={handleShareOpen}>
										<span className={styles.icon}>
											<ShareIcon />
										</span>
										<span className={styles.text}>Share</span>
									</MenuItem>
									<Divider />
									<MenuItem onClick={handleClose} className={styles.footer}>
										<div>
											<span>Powered by - </span>
											<a href="https://www.deeniinfotech.com/" target="_blank">
												Deeni Info Tech
											</a>
										</div>
									</MenuItem>
								</MenuList>
							</Popover>

							<ShareModal
								openModal={shareOpen}
								closer={handleShareClose}
								url={`${server}`}
								title="Quran Radio"
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default HeaderHome;
