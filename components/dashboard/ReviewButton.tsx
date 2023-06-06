import * as Tooltip from "@radix-ui/react-tooltip";
import {HiCheck, HiX} from "react-icons/hi";
import useTranslation from "next-translate/useTranslation";

interface ReviewButtonProps {
    status: ApplyStatus
    handleStatusChange: (newStatus: ApplyStatus) => void
}

const ReviewButton: React.FC<ReviewButtonProps> = ({ status, handleStatusChange }) => {
    const { t, lang } = useTranslation('table')
    const actionButton = (newStatus: ApplyStatus) => {
        return (
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <button className="text-violet11 shadow-blackA7 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                                onClick={() => handleStatusChange(newStatus)}
                        >
                            {newStatus === "APPROVED" ? <HiCheck className="w-[20px] h-[20px]"/> : <HiX className="w-[20px] h-[20px]"/> }
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                            sideOffset={5}
                        >
                            {newStatus === "APPROVED" ? t('approve') : t('reject')}
                            <Tooltip.Arrow className="fill-white" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        )
    }

    return (
        <div className="flex items-center space-x-4">
            {/* If the status is 'PENDING', show both 'APPROVED' and 'REJECTED' buttons */}
            {status === 'PENDING' && (
                <>
                    {actionButton("APPROVED")}
                    {actionButton("REJECTED")}
                </>
            )}

            {/* If the status is 'APPROVED', show the 'REJECTED' button */}
            {status === 'APPROVED' && actionButton("REJECTED")}

            {/* If the status is 'REJECTED', show the 'APPROVED' button */}
            {status === 'REJECTED' && actionButton("APPROVED")}
        </div>
    )
}

export default ReviewButton