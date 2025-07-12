
import { Link } from 'react-router';
import bookCover from "@/assets/image/book-cover.jpg"
import type { IBook } from '@/types';

const BookItem = ({ book }: { book: IBook }) => {
    return (
        <>
            <div className='book-item'>
                <div className='relative'>
                    <Link to={'/books/121'}>
                        <div className="book-cover relative">
                            <img src={bookCover} alt="Book Cover" className='book-img' />
                        </div>
                    </Link>
                </div>
                <div className="book-info">
                    <Link to={'/books/121'}>
                        <h4 className='text-[var(--heading-color)] text-sm font-semibold mt-2'>{book.title}</h4>
                    </Link>
                    <p className='text-[var(--text-color)] text-sm'>{book.genre}</p>
                </div>
            </div>
        </>
    );
};

export default BookItem;