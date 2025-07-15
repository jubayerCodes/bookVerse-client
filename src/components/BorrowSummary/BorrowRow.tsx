
import type { ISummedBorrow } from '@/types';
import { TableCell, TableRow } from '../ui/table';

const BorrowRow = ({ borrow }: { borrow: ISummedBorrow }) => {
    console.log(borrow);
    return (
        <>
            <TableRow className="border-[var(--border-color2)]">
                <TableCell className="font-medium pl-4 w-[300px]">{borrow?.book?.title}</TableCell>
                <TableCell className='text-xs'>{borrow?.book?.isbn}</TableCell>
                <TableCell className="text-end text-xs">{borrow.totalQuantity}</TableCell>
            </TableRow>
        </>
    );
};

export default BorrowRow;