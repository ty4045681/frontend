import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Home from "@/pages";
import AdminSideBar from "@/components/AdminSideBar";
import Header from "@/components/dashboard/Header";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Home">
                <Home/>
            </ComponentPreview>
            <ComponentPreview path="/Header">
                <Header userType={'user'}/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;