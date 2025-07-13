import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useDeleteBookMutation } from "@/lib/redux/api/booksApi";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";


const BookDeleteModal = ({ bookId }: { bookId: string }) => {

    const [open, setOpen] = useState(false)

    const [deleteBook] = useDeleteBookMutation()

    const handleDeleteBook = async () => {
        try {
            const res = await deleteBook(bookId).unwrap()

            if (res?.success) {
                toast.success(res?.message)
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <Button onClick={() => setOpen(true)} size={"sm"} variant="outline" className="border-[1px] border-[var(--border-color2)] cursor-pointer text-[10px] flex flex-col items-center h-fit gap-[2px] py-1">
                    <FaRegTrashAlt /> Delete
                </Button>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="flex flex-col items-center gap-2">
                        <FaRegTrashAlt className="text-red-500 text-4xl text-center" />
                        <h3 className="text-xl font-semibold">Are you sure?</h3>
                        <p className="text-sm text-center">This action is irreversible. The book will be permanently deleted.</p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => handleDeleteBook()} className="bg-red-500 cursor-pointer hover:bg-red-700">Yes, Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookDeleteModal;