"use client";

import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import FontFamilyMenu from "./FontFamilyMenu";
import FontSizeSlider from "./FontSizeSlider";
import LineHeightSlider from "./LineHeightSlider";
import useResumeGlobalStyle from "@/store/zustand/resumeGlobalStyleStore";
import PrimaryColorInput from "./PrimaryColorInput";
import BgColorInput from "./BgColorInput";
import TextColorInput from "./TextColorInput";
import useColorInputStore from "@/store/zustand/colorInputStore";
import { Menu } from "lucide-react";

type Props = {};

const CVDrawer = (props: Props) => {
    return (
        <Drawer
            direction="left"
            onClose={() => {
                useColorInputStore.setState({
                    showPrimaryColorPicker: false,
                    showBgColorPicker: false,
                    showTextColorPicker: false,
                });
            }}
        >
            <DrawerTrigger className="bg-primary px-2 p-2 rounded-md cursor-pointer">

                <Menu />

            </DrawerTrigger>
            <DrawerContent className="h-screen overflow-y-auto">
                <FontSizeSlider />
                <LineHeightSlider />

                <PrimaryColorInput />
                <BgColorInput />
                <TextColorInput />
                <FontFamilyMenu />
                <h1 className="py-80">f</h1>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default CVDrawer;
