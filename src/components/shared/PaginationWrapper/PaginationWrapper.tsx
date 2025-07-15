import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import type { IMeta } from "@/types";
import type { Dispatch, SetStateAction } from "react";

const PaginationWrapper = ({ meta, setPage }: { meta: IMeta, setPage: Dispatch<SetStateAction<number>> }) => {

    const pages = Array.from({ length: meta?.pages }, (_, i) => i + 1);

    const handleNext = () => {
        if (meta.page === pages.length) {
            return
        }
        setPage(meta?.page + 1)
    }

    const handlePrev = () => {
        if (meta.page <= 1) {
            return
        }
        setPage(meta?.page - 1)
    }

    if (meta?.pages === 1) {
        return <></>
    }

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePrev()} className={cn("cursor-pointer", {
                            "bg-accent text-accent-foreground cursor-no-drop": meta?.page <= 1
                        })} />
                    </PaginationItem>
                    {
                        pages?.map((page: number, idx: number) => <PaginationItem>
                            <PaginationLink href="#" key={idx} isActive={page === meta?.page} onClick={() => setPage(page)} className="cursor-pointer">{page}</PaginationLink>
                        </PaginationItem>)
                    }
                    <PaginationItem>
                        <PaginationNext onClick={() => handleNext()} className={cn("cursor-pointer", {
                            "bg-accent text-accent-foreground cursor-no-drop": meta?.page === pages?.length
                        })} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination >
        </>
    );
};

export default PaginationWrapper;