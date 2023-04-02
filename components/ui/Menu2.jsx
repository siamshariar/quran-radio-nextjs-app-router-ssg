import {
  shareSocialOutline,
  informationCircleOutline,
  homeOutline,
} from "ionicons/icons";
import Link from "next/link";

const menus = [
  {
    title: "হোম",
    icon: homeOutline,
    url: "/",
  },
  {
    title: "About",
    icon: informationCircleOutline,
    url: "/about",
  },
  {
    title: "List",
    icon: informationCircleOutline,
    url: "/list",
  },
  {
    title: "শেয়ার করুন",
    icon: shareSocialOutline,
    url: "#",
  },
];

const Menu = () => {
  return (
    <ion-menu side="start" content-id="main-content" menuId="menu2">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content className="menu">
        <ion-list>
          {menus.map((m, k) => (
            <ion-menu-toggle auto-hide={false} key={k}>
              <Link href={m.url} passHref>
                <ion-item detail={false} lines="none">
                  {/* <a> */}
                  <ion-icon icon={m.icon} slot="start" />
                  {m.title}
                  {/* </a> */}
                </ion-item>
              </Link>
            </ion-menu-toggle>
          ))}
        </ion-list>
      </ion-content>
    </ion-menu>
  );
};

export default Menu;
