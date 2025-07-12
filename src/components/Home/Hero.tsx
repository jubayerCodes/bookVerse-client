import heroGirl from '@/assets/image/hero-girl.png'
import heroBook from '@/assets/image/book.png'
import heroShape1 from '@/assets/image/bg-shape.png'
import heroFrame from '@/assets/image/frame.png'
import heroFrameShape from '@/assets/image/frame-shape.png'

const Hero = () => {

    return (
        <>
            <section id="hero" className="bg-[#d0e1e7] min-h-[70vh] flex items-center relative">
                <div className="my-container flex flex-col items-start">
                    <span className="offer text-sm text-[var(--secondary-color)] font-semibold">Up to 30% Off</span>
                    <h1 className="text-[var(--heading-color)] text-5xl font-bold my-5 leading-[1.3em]">
                        Explore and Borrow<br /> Books at BookVerse
                    </h1>
                    <button className="btn">
                        Explore now
                    </button>
                </div>
                <img src={heroFrameShape} alt="" className='absolute left-[45%] top-[40%]' />
                <img src={heroFrame} alt="" className='absolute left-110 top-5' />
                <img src={heroBook} alt="" className='absolute left-5 bottom-5 w-[150px]' />
                <img src={heroShape1} alt="" className='absolute right-5 top-0' />
                <img src={heroGirl} alt="" className='absolute right-70 bottom-0 w-[500px]' />
            </section>
        </>
    );
};

export default Hero;