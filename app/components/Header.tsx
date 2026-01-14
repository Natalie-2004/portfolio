import Link from "next/link";
import Nav from "./Nav";

const Header = () => {
    return (
        <header className="py-8 xl:py-6 text-white">
            <div className="w-full flex justify-between items-center">
                {/*    Logo section*/}
                <Link href="/">
                    <h1 className="text-4xl font-semibold font-primary">
                        Natalie<span className="text-accent">.</span>
                    </h1>
                </Link>

                {/*    navbar section*/}
                <div className="flex items-center gap-4 md:gap-8">
                    <Nav />
                    <Link href="/contact">
                        <button className="hidden sm:block bg-accent text-primary px-4 py-2 rounded-full font-bold hover:bg-accent-hover transition-all font-sans">
                            Hire me
                        </button>
                    </Link>
                </div>

                {/* TODO: 3. Mobile Nav */}
                {/*<div className="xl:hidden">Mobile Nav</div>*/}
            </div>
        </header>
    )
}

export default Header;