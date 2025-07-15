import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePostBorrowMutation } from '@/lib/redux/api/booksApi';
import type { IBook, IBorrow } from '@/types';
import { useState } from 'react';
import { FaBookBookmark } from 'react-icons/fa6';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

type BorrowFormValues = {
    quantity: number;
    dueDate: Date | null;
}

const BookBorrowModal = ({ book }: { book: IBook }) => {

    const [borrowOpen, setBorrowOpen] = useState(false)
    const navigate = useNavigate()


    const borrowForm = useForm<BorrowFormValues>({
        defaultValues: {
            quantity: 1,
            dueDate: null
        }
    })

    const [postBorrow] = usePostBorrowMutation()

    const handleBorrow = async (data: BorrowFormValues) => {

        if (!data.dueDate) return;

        const newBorrow: Omit<IBorrow, "_id"> = {
            book: book?._id,
            dueDate: data.dueDate,
            quantity: data.quantity
        }

        try {
            const res = await postBorrow(newBorrow).unwrap()

            if (res?.success) {
                toast.success(res?.message)
                borrowForm.reset()
                setBorrowOpen(false)
                navigate('/borrow-summary')
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
            borrowForm.reset()
            setBorrowOpen(false)
        }
    }

    return (
        <>
            <Dialog open={borrowOpen} onOpenChange={setBorrowOpen}>
                <Button onClick={() => setBorrowOpen(true)} size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1 dark:text-white">
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
                                                <Input type="number" min={1} placeholder={`Min 1 and Max ${book.copies}`} {...field} onChange={(e) => field.onChange(Number(e.target.value))} className='dark:text-[var(--text-color)]' />
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
                                                                "text-left font-normal dark:text-[var(--text-color)]",
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
                                    <Button variant="outline" className='cursor-pointer dark:text-white'>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className='cursor-pointer'>Borrow</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookBorrowModal;