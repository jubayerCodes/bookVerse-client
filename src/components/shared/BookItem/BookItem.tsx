// import bookCover from "@/assets/image/book-cover.jpg"
import type { IBook, IBorrow } from '@/types';
import "./BookItem.css"
import { Button } from '@/components/ui/button';
import { FaEdit, FaEye, FaRegTrashAlt } from 'react-icons/fa';
import { FaBookBookmark } from 'react-icons/fa6';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useState } from 'react';
import { usePostBorrowMutation } from '@/lib/redux/api/booksApi';

type BorrowFormValues = {
    quantity: number;
    dueDate: Date | null;
}

const BookItem = ({ book }: { book: IBook }) => {

    const [borrowOpen, setBorrowOpen] = useState(false)

    const [postBorrow, { data }] = usePostBorrowMutation()

    const borrowForm = useForm<BorrowFormValues>({
        defaultValues: {
            quantity: 1,
            dueDate: null
        }
    })

    const handleBorrow = async (data: BorrowFormValues) => {

        if (!data.dueDate) return;

        const newBorrow: Omit<IBorrow, "_id"> = {
            book: book._id,
            dueDate: data.dueDate,
            quantity: data.quantity
        }

        try {
            const res = await postBorrow(newBorrow).unwrap()

            if (res?.success) {
                toast.success(res?.message)
                borrowForm.reset()
                setBorrowOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
            borrowForm.reset()
            setBorrowOpen(false)
        }
    }

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
                        <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>

                            <Button onClick={() => setBorrowOpen(true)} size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1">
                                <FaBookBookmark /> Borrow
                            </Button>
                            <DialogContent className="sm:max-w-[425px]">
                                <Form {...borrowForm}>
                                    <form onSubmit={borrowForm.handleSubmit(handleBorrow)}>
                                        <DialogHeader>
                                            <DialogTitle>Borrow Book</DialogTitle>
                                            <DialogDescription className='hidden'></DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-5">
                                            <FormField
                                                control={borrowForm.control}
                                                name="quantity"
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" min={1} placeholder={`Min 1 and Max ${book.copies}`} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={borrowForm.control}
                                                name="dueDate"
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Return Date</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a return date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value ?? undefined}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) =>
                                                                        date < new Date()
                                                                    }
                                                                    captionLayout="dropdown"
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" className='cursor-pointer'>Borrow</Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>



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