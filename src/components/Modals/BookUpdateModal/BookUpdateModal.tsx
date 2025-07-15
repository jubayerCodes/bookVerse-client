import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genreOptions, type IBook } from '@/types';
import { FaEdit } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateBookMutation } from '@/lib/redux/api/booksApi';
import { toast } from 'sonner';

const BookUpdateModal = ({ book }: { book: IBook }) => {

    const [open, setOpen] = useState(false)

    const [updateBook] = useUpdateBookMutation()

    const form = useForm<Omit<IBook, "_id" | "createdAt" | "updatedAt" | "available">>({
        defaultValues: {
            title: book.title,
            author: book.author,
            copies: book.copies,
            description: book.description,
            genre: book.genre,
            isbn: book.isbn
        }
    })

    useEffect(() => {
        if (open) {
            form.reset({
                title: book.title,
                author: book.author,
                copies: book.copies,
                description: book.description,
                genre: book.genre,
                isbn: book.isbn
            });
        }
    }, [open, book, form]);


    const handleUpdateBook = async (data: Omit<IBook, "_id" | "createdAt" | "updatedAt" | "available">) => {
        const updatedBook: Omit<IBook, "createdAt" | "updatedAt" | "available"> = {
            _id: book._id,
            title: data?.title,
            author: data?.author,
            copies: data?.copies,
            genre: data?.genre,
            isbn: data?.isbn,
            description: data?.description
        }

        try {
            const res = await updateBook(updatedBook).unwrap()

            if (res?.success) {
                toast.success(res?.message)
                form.reset()
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button onClick={() => setOpen(true)} size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1 dark:text-white">
                    <FaEdit /> Update
                </Button>
                <DialogContent className="sm:max-w-[500px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdateBook)}>
                            <DialogHeader>
                                <DialogTitle>Update Book</DialogTitle>
                                <DialogDescription className='hidden'></DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-5">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input className='dark:text-[var(--text-color)]' type="text" placeholder={"Book title"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="author"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input className='dark:text-[var(--text-color)]' type="text" placeholder={"Book author"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isbn"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ISBN</FormLabel>
                                            <FormControl>
                                                <Input className='dark:text-[var(--text-color)]' type="text" placeholder={"Book ISBN"} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="copies"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Copies</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder={"Book copies"} {...field} onChange={(e) => field.onChange(Number(e.target.value))} min={0} className='dark:text-[var(--text-color)]' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='grid gap-4 pb-5'>
                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='w-full dark:text-[var(--text-color)]'>
                                                        <SelectValue placeholder="Select genre" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        genreOptions.map((genre, idx) => <SelectItem value={genre} key={idx}>{genre}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Book description"
                                                    className="resize-none dark:text-[var(--text-color)]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className='cursor-pointer dark:text-white'>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className='cursor-pointer'>Update</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookUpdateModal;