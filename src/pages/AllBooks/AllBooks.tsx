import BookRow from "@/components/AllBooks/BookRow/BookRow";
import PaginationWrapper from "@/components/shared/PaginationWrapper/PaginationWrapper";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/lib/redux/api/booksApi";
import { bookKeys, genreOptions, type GenreType, type IBook, type IMeta } from "@/types";
import { useState } from "react";

const AllBooks = () => {

    const [genre, setGenre] = useState<GenreType | "">("");
    const [limit, setLimit] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [sort, setSort] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = useGetAllBooksQuery({
        filter: genre || undefined,
        limit: limit || undefined,
        page: page,
        sortBy,
        sort
    })

    const books = data?.data

    return (
        <>
            <section className="all-books section">
                <div className="my-container">
                    <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-stretch sm:justify-between">
                        <div className="flex justify-start gap-4 dark:text-[var(--text-color)]">
                            <Select onValueChange={(value: GenreType) => {
                                setGenre(value)
                                setPage(1)
                            }} value={genre}>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Select a genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Genres</SelectLabel>
                                        {
                                            genreOptions.map((genre, idx) => <SelectItem className="text-xs" value={genre} key={idx}>{genre}</SelectItem>)
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

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

                                        <SelectItem className="text-xs" value={"10"} >10</SelectItem>
                                        <SelectItem className="text-xs" value={"20"} >20</SelectItem>
                                        <SelectItem className="text-xs" value={"30"} >30</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-start gap-4 dark:text-[var(--text-color)]">
                            <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sort by</SelectLabel>
                                        {
                                            bookKeys.map((book, idx) => <SelectItem className="text-xs" value={book} key={idx}>{book === "createdAt" ? "Created" : book === "updatedAt" ? "Last Modified" : book}</SelectItem>)
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value: "asc" | "desc") => setSort(value)} value={sort}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sort</SelectLabel>

                                        <SelectItem className="text-xs" value={"asc"} >Asc</SelectItem>
                                        <SelectItem className="text-xs" value={"desc"} >Desc</SelectItem>

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    <div className="my-4 rounded-lg border border-[var(--border-color2)] overflow-hidden">
                        <Table>
                            <TableHeader className="py-5">
                                <TableRow className="border-[var(--border-color2)] text-xs">
                                    <TableHead className="h-14 pl-4 w-[300px]">Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Genre</TableHead>
                                    <TableHead>ISBN</TableHead>
                                    <TableHead className="text-center">Copies</TableHead>
                                    <TableHead className="text-center">Available</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    books?.map((book: IBook) => <BookRow key={book._id} book={book} />)
                                }
                                {
                                    isLoading &&
                                    Array.from({ length: 10 }, (_, i) =>
                                        <TableRow key={i} className="border-[var(--border-color2)] dark:text-[var(--text-color)]">
                                            <TableCell className="pl-4 w-[300px]">
                                                <Skeleton className="h-4 w-3/4 rounded" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-3 w-1/2 rounded" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-3 w-1/3 rounded" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-3 w-2/3 rounded" />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Skeleton className="h-3 w-6 mx-auto rounded" />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Skeleton className="h-3 w-5 mx-auto rounded" />
                                            </TableCell>
                                            <TableCell className="text-right pr-4">
                                                <div className="flex justify-end gap-2">
                                                    <Skeleton className="h-8 w-12 rounded" />
                                                    <Skeleton className="h-8 w-12 rounded" />
                                                    <Skeleton className="h-8 w-12 rounded" />
                                                    <Skeleton className="h-8 w-12 rounded" />
                                                </div>
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
    );
};

export default AllBooks;