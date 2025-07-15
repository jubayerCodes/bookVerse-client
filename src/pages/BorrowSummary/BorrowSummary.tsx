// import PaginationWrapper from "@/components/shared/PaginationWrapper/PaginationWrapper";
import BorrowRow from "@/components/BorrowSummary/BorrowRow";
import PaginationWrapper from "@/components/shared/PaginationWrapper/PaginationWrapper";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/lib/redux/api/booksApi";
import type { IMeta, ISummedBorrow } from "@/types";
import { useState } from "react";


const BorrowSummary = () => {

    const [limit, setLimit] = useState<string>("");
    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = useGetBorrowSummaryQuery({
        limit: limit || undefined,
        page: page,
    })

    const borrows = data?.data

    return (
        <>
            <>
                <section className="all-books section">
                    <div className="my-container">
                        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-stretch sm:justify-between">
                            <div className="flex justify-start gap-4 dark:text-[var(--text-color)]">
                                <Select onValueChange={(value) => {
                                    setLimit(value)
                                    setPage(1)
                                }} value={limit}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Limit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Limits</SelectLabel>

                                            <SelectItem className="text-xs" value={"5"} >5</SelectItem>
                                            <SelectItem className="text-xs" value={"10"} >10</SelectItem>
                                            <SelectItem className="text-xs" value={"20"} >20</SelectItem>
                                            <SelectItem className="text-xs" value={"30"} >30</SelectItem>

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="my-4 rounded-lg border border-[var(--border-color2)] overflow-hidden">
                            <Table>
                                <TableHeader className="py-5">
                                    <TableRow className="border-[var(--border-color2)] text-xs">
                                        <TableHead className="h-14 pl-4 min-w-[300px]">Book Title</TableHead>
                                        <TableHead>ISBN</TableHead>
                                        <TableHead className="text-end">Total Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        borrows?.map((borrow: ISummedBorrow) => <BorrowRow key={borrow._id} borrow={borrow} />)
                                    }
                                    {
                                        isLoading &&
                                        Array.from({ length: 8 }, (_, i) =>
                                            <TableRow key={i} className="border-[var(--border-color2)] dark:text-[var(--text-color)]">
                                                <TableCell className="pl-4 w-[300px]">
                                                    <Skeleton className="h-4 w-3/4 rounded" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-3 w-2/3 rounded" />
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <Skeleton className="h-3 w-6 ml-auto rounded" />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <div className="w-full flex justify-center lg:justify-end">
                            <div>
                                <PaginationWrapper meta={data?.meta as IMeta} setPage={setPage} />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    );
};

export default BorrowSummary;