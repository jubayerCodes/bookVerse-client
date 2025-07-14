import BookRow from "@/components/AllBooks/BookRow/BookRow";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/lib/redux/api/booksApi";
import { bookKeys, genreOptions, type GenreType, type IBook } from "@/types";
import { useState } from "react";

const AllBooks = () => {

    const [genre, setGenre] = useState<GenreType | "">("");
    const [limit, setLimit] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("createdAt");
    const [sort, setSort] = useState<"asc" | "desc">("asc");

    const { data } = useGetAllBooksQuery({
        filter: genre || undefined,
        limit: limit || undefined,
        sortBy,
        sort
    })

    const books = data?.data

    return (
        <>
            <section className="all-books">
                <div className="my-container py-10">
                    <div className="flex justify-between">

                        <div className="flex justify-start gap-4">
                            <Select onValueChange={(value: GenreType) => setGenre(value)} value={genre}>
                                <SelectTrigger className="w-[150px]">
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

                            <Select onValueChange={(value) => setLimit(value)} value={limit}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select limit" />
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
                        <div className="flex justify-start gap-4">
                            <Select onValueChange={(value) => setSortBy(value)} value={sortBy}>
                                <SelectTrigger className="w-[150px]">
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
                                <SelectTrigger className="w-[150px]">
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
                            </TableBody>
                        </Table>
                    </div>
                    <div></div>
                </div>
            </section >
        </>
    );
};

export default AllBooks;