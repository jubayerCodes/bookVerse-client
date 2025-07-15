import BookBorrowModal from '@/components/Modals/BookBorrowModal/BookBorrowModal';
import BookDeleteModal from '@/components/Modals/BookDeleteModal/BookDeleteModal';
import BookUpdateModal from '@/components/Modals/BookUpdateModal/BookUpdateModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import type { IBook } from '@/types';
import { FaEye } from 'react-icons/fa';

const BookRow = ({ book }: { book: IBook }) => {
    return (
        <>
            <TableRow className="border-[var(--border-color2)] dark:text-[var(--text-color)]">
                <TableCell className="font-medium pl-4 w-[300px]">{book.title}</TableCell>
                <TableCell className='text-xs'>{book.author}</TableCell>
                <TableCell className='text-xs'>{book.genre}</TableCell>
                <TableCell className='text-xs'>{book.isbn}</TableCell>
                <TableCell className="text-center text-xs">{book.copies}</TableCell>
                <TableCell className='text-center text-xs'>{book.available ? "✅" : "❌"}</TableCell>
                <TableCell className='text-right flex justify-end gap-2 pr-4'>

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

                </TableCell>
            </TableRow>
        </>
    );
};

export default BookRow;