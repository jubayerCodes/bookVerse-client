import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { genreOptions, type GenreType, type IBook } from '@/types';
import { useForm } from 'react-hook-form';
import './AddBook.css'
import { usePostBookMutation } from '@/lib/redux/api/booksApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const AddBook = () => {

    const navigate = useNavigate()

    const [postBook] = usePostBookMutation()

    const form = useForm<Omit<IBook, "_id" | "createdAt" | "updatedAt" | "available">>({
        defaultValues: {
            title: "",
            author: "",
            isbn: "",
            copies: 0,
            genre: "" as GenreType,
            description: ""
        }
    })

    const handleAddBook = async (data: Omit<IBook, "_id" | "createdAt" | "updatedAt" | "available">) => {
        try {
            const res = await postBook({ ...data, available: !!data?.copies }).unwrap()

            if (res?.success) {
                toast.success(res?.message)
                form.reset()
                navigate('/books')
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <>
            <section className="section add-book">
                <div className="my-container">
                    <div className="form-container max-w-[800px] mx-auto border p-5 border-[var(--border-color2)] rounded-lg bg-[var(--background-color2)]">

                        <h2 className='text-center'>Add a Book</h2>
                        <p className='text-[var(--text-color)] text-sm text-center xl:px-24 pt-2 pb-5'>
                            Please complete the form below to add a new book to the library. Make sure to include all required information.
                        </p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddBook)}>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-[var(--text-color)]'>Title</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder={"Book title"} {...field} className='bg-white dark:text-[var(--text-color)]' />
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
                                                <FormLabel className='text-[var(--text-color)]'>Author</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder={"Book author"} {...field} className='bg-white dark:text-[var(--text-color)]' />
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
                                                <FormLabel className='text-[var(--text-color)]'>ISBN</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder={"Book ISBN"} {...field} className='bg-white dark:text-[var(--text-color)]' />
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
                                                <FormLabel className='text-[var(--text-color)]'>Copies</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder={"Book copies"} {...field} onChange={(e) => field.onChange(Number(e.target.value))} min={0} className='bg-white text-[var(--text-color)] dark:text-[var(--text-color)]' />
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
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-[var(--text-color)]'>Genre</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='w-full bg-white dark:text-[var(--text-color)]'>
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
                                                <FormLabel className='text-[var(--text-color)]'>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Book description"
                                                        className="resize-none bg-white dark:text-[var(--text-color)]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex justify-center'>
                                    <Button type="submit" className='cursor-pointer'>Add Book</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddBook;