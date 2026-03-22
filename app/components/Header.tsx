import Nav from "./Nav";
import TransitionLink from "./TransitionLink";

const Header = () => {
    return (
        <header className="py-8 xl:py-6 text-white">
            <div className="w-full flex justify-between items-center">
                {/*    Logo section*/}
                <TransitionLink href="/">
                    <h1 className="text-4xl font-semibold font-primary">
                        Natalie<span className="text-accent">.</span>
                    </h1>
                </TransitionLink>

                {/*    navbar section*/}
                <div className="flex items-center gap-4 md:gap-8">
                    <Nav />
                    <TransitionLink href="/contact">
                        <button type="button" className="hidden sm:block bg-accent text-primary px-4 py-2 rounded-full font-bold hover:bg-accent-hover transition-all font-sans">
                            Contact me
                        </button>
                    </TransitionLink>
                </div>

                {/* TODO: 3. Mobile Nav */}
                {/*<div className="xl:hidden">Mobile Nav</div>*/}
            </div>
        </header>
    )
}

export default Header;