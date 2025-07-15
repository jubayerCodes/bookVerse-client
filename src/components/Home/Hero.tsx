import heroGirl from '@/assets/image/hero-girl.png'
import heroBook from '@/assets/image/book.png'
import heroShape1 from '@/assets/image/bg-shape.png'
import heroFrame from '@/assets/image/frame.png'
import heroFrameShape from '@/assets/image/frame-shape.png'

const Hero = () => {

    return (
        <>
            <section id="hero" className="bg-[#d0e1e7] dark:bg-accent py-[200px] flex items-center relative xl:px-0 px-4 sm:px-5">
                <div className="my-container flex flex-col items-center  md:items-start">
                    <span className="offer text-sm text-[var(--secondary-color)] font-semibold">Up to 30% Off</span>
                    <h1 className="text-[var(--heading-color)] text-3xl lg:text-5xl font-bold my-5 leading-[1.3em]">
                        Explore and Borrow<br /> Books at BookVerse
                    </h1>
                    <button className="btn">
                        Explore now
                    </button>
                </div>
                <img src={heroFrameShape} alt="" className='absolute left-[45%] top-[40%] hidden md:block' />
                <img src={heroFrame} alt="" className='absolute left-110 top-5 hidden xl:block' />
                <img src={heroBook} alt="" className='absolute left-5 bottom-5 w-[150px]' />
                <img src={heroShape1} alt="" className='absolute right-5 top-0' />
                <img src={heroGirl} alt="" className='absolute md:right-10 lg:right-16 xl:right-70 bottom-0 w-[350px] lg:w-[450px] hidden md:block' />
            </section>
        </>
    );
};

export default Hero;