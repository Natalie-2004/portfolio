import { Download } from "lucide-react";
import Socials from "./components/Socials";
import Avatar from "./components/Avatar";
import Stats from "./components/Stats";

export default function Home() {
    return (
        <section className="h-full pb-6 lg:pb-12 pt-0">
            <div className="h-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0 lg:pt-8 lg:pb-24">

                    {/* LHS */}
                    <div className="text-center lg:text-left order-2 lg:order-none">
                       <span className="text-lg --font-courier text-white/70 tracking-wider block">
                            Software Developer
                       </span>

                        <h1 className="my-6">
                            <span className="block font-bold text-6xl lg:text-7xl tracking-[0.10em] text-white/80 mb-1">
                                  Hello I&apos;m
                            </span>
                            <span className="block font-bold text-6xl lg:text-7xl tracking-[0.10em] text-accent leading-none">
                                Natalie
                            </span>
                        </h1>


                        <p className="max-w-[500px] mb-9 text-white/70 mx-auto lg:mx-0 font-primary text-sm leading-relaxed">
                            I craft seamless web experiences using Next.js and MongoDB.
                            Currently interning at Risk Hub and having fun at UNSW.
                        </p>

                        {/* avatar */}
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <a href="/Natalie_resume.pdf" download target="_blank">
                                <button className="uppercase flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-primary transition-all px-6 py-3 rounded-full font-bold tracking-wider">
                                    <span className="text-sm">Download CV</span>
                                    <Download className="text-lg" />
                                </button>
                            </a>

                            <div className="mb-8 lg:mb-0">
                                <Socials
                                    containerStyles="flex gap-6"
                                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RHS */}
                    <div className="order-1 lg:order-none mb-8 lg:mb-0">
                        <Avatar />
                    </div>
                </div>
            </div>

            <Stats />
        </section>
    );
}
