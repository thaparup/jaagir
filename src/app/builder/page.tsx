"use client";

import BuilderForm from "@/components/BuilderForm";
import CreateResumeModal from "@/components/CreateResumeModal";
import NavbarIcon from "@/components/NavbarIcon";
import { Plus } from "lucide-react";

import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    return (
        <div className="w-screen flex gap-2">
            <div
                className="bg-gray-400/50 pt-20 flex flex-col items-center rounded-md shadow-md cursor-pointer"
                onClick={() => setOpenModal((prev) => !prev)}
            >
                <div className="bg-primary rounded-md p-4">
                    <Plus size={70} className='text-white' />
                </div>
                <span className="block text-md text-black font-bold pl-4 pr-12 pt-14">
                    Create a new resume
                </span>
                <span className="block text-sm text-black font-light  pl-4 pr-12 pb-4">
                    Start building from scratch
                </span>
            </div>

            <CreateResumeModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
};

export default page;
