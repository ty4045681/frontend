import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {HiX} from "react-icons/hi";

interface ModalProps {
    type: 'primary' | 'warning'
    disabled?: boolean
    triggerTitle: string
    title: string
    description?: string
    content?: React.ReactNode
    confirmTitle?: string
    onClickConfirm?: () => void
}

const Modal: React.FC<ModalProps> = ({ type, disabled, triggerTitle, title, description, content, confirmTitle, onClickConfirm }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild disabled={disabled}>
                <button className={`${type === 'primary' ? 'bg-blue-400' : 'bg-red-400'} ${!disabled && (type === 'primary' ? 'hover:bg-blue-500' : 'hover:bg-red-500')} text-white shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none`}>
                    {triggerTitle}
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        {title}
                    </Dialog.Title>
                    {description && (
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                            {description}
                        </Dialog.Description>
                    )}
                    {/*Custom content*/}
                    {content && (
                        <div className="mt-[10px] mb-5">
                            {content}
                        </div>
                    )}

                    {confirmTitle && onClickConfirm && (
                        <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                                <button
                                    className={`${type === 'primary' ? 'bg-blue-200 hover:bg-blue-500' : 'bg-red-200 hover:bg-red-500'} text-black dark:text-white  focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none`}
                                    onClick={onClickConfirm}
                                >
                                    {confirmTitle}
                                </button>
                            </Dialog.Close>
                        </div>
                    )}
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <HiX />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal