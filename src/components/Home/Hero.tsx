

const Hero = () => {
    return (
        <>
            <section id="hero" className="bg-[#d0e1e7] min-h-[70vh] flex items-center">
                <div className="my-container flex flex-col items-start">
                    <span className="offer">Up to 30% Off</span>
                    <h1 className="text-[var(--heading-color)] text-5xl font-bold">
                        Explore, Borrow, and Discover <br /> Books at BookVerse
                    </h1>
                    <button className="btn">
                        Explore now
                    </button>
                </div>
            </section>
        </>
    );
};

export default Hero;