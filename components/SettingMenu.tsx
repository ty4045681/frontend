import React from "react";
import useTranslation from "next-translate/useTranslation";
import {useTheme} from "next-themes";
import setLanguage from "next-translate/setLanguage";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {HiAdjustments} from "react-icons/hi";
import {BsDot} from "react-icons/bs";
import {FaRegMoon, FaSun} from "react-icons/fa";
import {RiEmphasisCn, RiEnglishInput} from "react-icons/ri";

const SettingMenu: React.FC = () => {
    const { t, lang } = useTranslation('setting_menu')
    const { theme, setTheme } = useTheme()

    const handleLanguageChange = async (lang: string) => {
        await setLanguage(lang)
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                    aria-label="Customise options"
                >
                    <HiAdjustments />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                        {t('dark_mode')}
                    </DropdownMenu.Label>
                    <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                        <DropdownMenu.RadioItem
                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            value="system"
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <BsDot />
                            </DropdownMenu.ItemIndicator>
                            {t('system')}
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            value="light"
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <FaSun />
                            </DropdownMenu.ItemIndicator>
                            {t('light')}
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            value="dark"
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <FaRegMoon />
                            </DropdownMenu.ItemIndicator>
                            {t('dark')}
                        </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                    <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />
                    <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                        {t('language')}
                    </DropdownMenu.Label>
                    <DropdownMenu.RadioGroup value={lang} onValueChange={handleLanguageChange}>
                        <DropdownMenu.RadioItem
                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            value="en"
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <RiEnglishInput />
                            </DropdownMenu.ItemIndicator>
                            English
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
                            className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                            value="zh-cn"
                        >
                            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <RiEmphasisCn />
                            </DropdownMenu.ItemIndicator>
                            简体中文
                        </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default SettingMenu