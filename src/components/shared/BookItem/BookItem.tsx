// import bookCover from "@/assets/image/book-cover.jpg"
import type { IBook } from '@/types';
import "./BookItem.css"
import { Button } from '@/components/ui/button';
import { FaEye } from 'react-icons/fa';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BookBorrowModal from '@/components/Modals/BookBorrowModal/BookBorrowModal';
import BookUpdateModal from '@/components/Modals/BookUpdateModal/BookUpdateModal';
import BookDeleteModal from '@/components/Modals/BookDeleteModal/BookDeleteModal';

const BookItem = ({ book }: { book: IBook }) => {

    return (
        <>
            <div className='book-item'>
                <div className='flex flex-col justify-between h-full'>
                    <div className="book-info">
                        <h3 className='text-[var(--heading-color)] text-lg font-semibold'>{book.title}</h3>
                        <p className='text-[var(--text-color)] text-xs mb-2'>by {book.author}</p>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-[var(--text-color)] text-xs'><b>Genre:</b> {book.genre}</p>
                            <p className='text-[var(--text-color)] text-xs'><b>Copies:</b> {book.copies}</p>
                        </div>
                        <div className='flex justify-between items-center mt-1'>
                            <p className='text-[var(--text-color)] text-xs'><b>ISBN:</b> {book.isbn}</p>
                            <p className='text-[var(--text-color)] text-xs'><b>Available:</b> {book.available ? "✅" : "❌"}</p>
                        </div>
                    </div>
                    <div className='book-actions mt-4 flex justify-center md:justify-between gap-2 md:gap-0 items-stretch'>


                        {/* View Book Modal */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit py-1 gap-[2px] dark:text-white">
                                    <FaEye /> View
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                    <DialogTitle>Book Details</DialogTitle>
                                    <DialogDescription className='hidden'></DialogDescription>
                                </DialogHeader>
                                <div className='bg-[var(--background-color2)] p-5 rounded-md'>
                                    <h3 className='text-[var(--heading-color)] text-lg font-semibold'>{book.title}</h3>
                                    <p className='text-[var(--text-color)] text-xs'>by {book.author}</p>
                                    <div className='flex justify-between items-center mt-3'>
                                        <p className='text-[var(--text-color)] text-sm'><b>Genre:</b> {book.genre}</p>
                                        <p className='text-[var(--text-color)] text-sm'><b>Copies:</b> {book.copies}</p>
                                    </div>
                                    <div className='flex justify-between items-center mt-1'>
                                        <p className='text-[var(--text-color)] text-sm'><b>ISBN:</b> {book.isbn}</p>
                                        <p className='text-[var(--text-color)] text-sm'><b>Available:</b> {book.available ? "✅" : "❌"}</p>
                                    </div>
                                    <div className='flex justify-between items-center mt-3'>
                                        <p className='text-[var(--text-color)] text-sm'><b>Description:</b> <br />{book.description}</p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className='dark:text-white'>Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


                        {/* Borrow Book Modal */}
                        <BookBorrowModal book={book} />

                        {/* Update book modal */}

                        <BookUpdateModal book={book} />

                        {/* Delete Book modal */}

                        <BookDeleteModal bookId={book?._id} />
                    </div>
                </div>
            </div >
        </>
    );
};

export default BookItem;