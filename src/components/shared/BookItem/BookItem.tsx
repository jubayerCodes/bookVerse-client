// import bookCover from "@/assets/image/book-cover.jpg"
import type { IBook } from '@/types';
import "./BookItem.css"
import { Button } from '@/components/ui/button';
import { FaEdit, FaEye, FaRegTrashAlt } from 'react-icons/fa';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BookBorrowModal from '@/components/Modals/BookBorrowModal/BookBorrowModal';

const BookItem = ({ book }: { book: IBook }) => {

    return (
        <>
            <div className='book-item'>
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
                    <div className='book-actions mt-4 flex justify-between items-stretch'>


                        {/* View Book Modal */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit py-1 gap-[2px]">
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
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


                        {/* Borrow Book Modal */}
                        <BookBorrowModal book={book} />


                        <Button size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1">
                            <FaEdit /> Update
                        </Button>

                        <Button size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1">
                            <FaRegTrashAlt /> Delete
                        </Button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default BookItem;