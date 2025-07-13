import BookRow from "@/components/AllBooks/BookRow/BookRow";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllBooksQuery } from "@/lib/redux/api/booksApi";
import type { IBook } from "@/types";

const AllBooks = () => {

    const { data } = useGetAllBooksQuery()

    const books = data?.data

    return (
        <>
            <section className="all-books">
                <div className="my-container">
                    <div></div>
                    <div className="my-10 rounded-lg border border-[var(--border-color2)] overflow-hidden">
                        <Table>
                            <TableHeader className="py-5">
                                <TableRow className="border-[var(--border-color2)] text-xs">
                                    <TableHead className="h-14 pl-4">Title</TableHead>
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
            </section>
        </>
    );
};

export default AllBooks;