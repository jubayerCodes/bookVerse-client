import BookItem from "@/components/shared/BookItem/BookItem";
import { useGetAllBooksQuery } from "@/lib/redux/api/booksApi";
import type { IBook } from "@/types";
import { Link } from "react-router";


const BooksGrid = () => {

    const { data } = useGetAllBooksQuery({ sortBy: "createdAt", sort: "desc" })

    const books = data?.data

    return (
        <>
            <section>
                <div className='my-container py-10 relative'>
                    <div className='flex justify-between items-end'>
                        <div>
                            <span className='bg-[var(--primary-color)] px-2 py-0.5 text-white text-sm rounded-[2px]'>Books</span>
                            <h2 className='mt-1'>Popular Books</h2>
                        </div>
                        <Link to={"/books"} className='btn-link'>
                            View All
                        </Link>
                    </div>
                    <div className="mt-8">
                        <div
                            className="grid grid-cols-6 gap-5"
                        >
                            {
                                books?.map((book: IBook, i: number) => (
                                    <BookItem key={i} book={book} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BooksGrid;