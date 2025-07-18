import BookItem from "@/components/shared/BookItem/BookItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBooksQuery } from "@/lib/redux/api/booksApi";
import type { IBook } from "@/types";
import { Link } from "react-router";


const BooksGrid = () => {

    const { data, isLoading } = useGetAllBooksQuery({ sortBy: "createdAt", sort: "desc", limit: "8" })

    const books = data?.data

    return (
        <>
            <section className="section">
                <div className='my-container relative'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='mt-1'>Popular Books</h2>
                        </div>
                        <Link to={"/books"} className='btn-link'>
                            View All
                        </Link>
                    </div>
                    <div className="mt-8">
                        <div
                            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                        >
                            {
                                books?.map((book: IBook, i: number) => (
                                    <BookItem key={i} book={book} />
                                ))
                            }
                            {
                                isLoading &&
                                Array.from({ length: 8 }, (_, i) =>
                                    <div key={i} className="rounded-lg p-4 flex flex-col justify-between h-full space-y-4">
                                        {/* Title & Author */}
                                        <div className="space-y-1">
                                            <Skeleton className="h-20 w-full rounded" />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center gap-2 mt-4">
                                            <Skeleton className="h-8 w-14 rounded" />
                                            <Skeleton className="h-8 w-14 rounded" />
                                            <Skeleton className="h-8 w-14 rounded" />
                                            <Skeleton className="h-8 w-14 rounded" />
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BooksGrid;