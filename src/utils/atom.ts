import { atom } from "recoil";
export const isDarkAtom = atom({
	key: "isDark",
	default: true,
});

export const isCardOpen = atom({
	key: "isCardOpen",
	default: false,
});
