import { Terminal, Loader2, ArrowUpRight } from "lucide-react";
import { projectData } from "./share/data";
import Link from "next/link";

export default function Project() {
    return (
        <section className="max-w-5xl mx-auto">
            <h2 className="font-bold mb-8 flex items-center gap-3 text-3xl text-accent">
                <Terminal /> Projects
            </h2>

            <div className="flex flex-col gap-6">
                {projectData.map((project, index) => {
                    const card = (
                        <div
                            className={`
                            relative flex flex-col md:flex-row items-start gap-6 md:gap-10 p-8 rounded-3xl
                            border border-white/10 bg-white/5 
                            transition-all duration-300 ease-out
                            
                            /* Hover Effects: 背景变 Accent，边框变 Accent */
                            hover:bg-accent hover:border-accent hover:scale-[1.01] hover:shadow-lg
                        `}>

                            {/* 01. 左侧大数字 (Miya 风格) */}
                            <div className="flex-shrink-0">
                                <span className={`
                                    text-6xl font-black font-serif opacity-20
                                    text-white 
                                    transition-colors duration-300
                                    
                                    /* Hover: 数字颜色变深，显得更融合 */
                                    group-hover:text-black/20 group-hover:opacity-100
                                `}>
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                            </div>

                            {/* 02. 右侧内容区域 */}
                            <div className="flex-grow w-full">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className={`
                                            font-bold text-2xl mb-1
                                            text-white
                                            transition-colors duration-300
                                            
                                            /* Hover: 标题变深色 */
                                            group-hover:text-black
                                        `}>
                                            {project.title}
                                        </h3>
                                        <span className={`
                                            text-sm font-mono
                                            text-accent
                                            transition-colors duration-300
                                            
                                            /* Hover: 技术栈文字变深灰色 */
                                            group-hover:text-black/70
                                        `}>
                                            {project.tech}
                                        </span>
                                    </div>

                                    {/* 右上角图标或状态 */}
                                    <div className="flex flex-col items-end gap-2">
                                        {project.detail && (
                                            <ArrowUpRight
                                                className={`
                                                    text-white/50 transition-all duration-300 
                                                    group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1
                                                `}
                                            />
                                        )}

                                        {project.status === "In Progress" && (project as any).showStatus !== false && (
                                            <span className={`
                                                flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded
                                                border transition-colors duration-300
                                                
                                                /* 默认状态: 黄色 */
                                                text-yellow-400 border-yellow-400/20 bg-yellow-400/5
                                                
                                                /* Hover状态: 变成深色背景以适应亮色底 */
                                                group-hover:bg-black/10 group-hover:text-black group-hover:border-black/20
                                            `}>
                                                <Loader2 size={10} className="animate-spin" /> WIP
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 文字描述列表 */}
                                <ul className={`
                                    list-disc list-outside ml-5 space-y-2 text-base
                                    text-white/60
                                    transition-colors duration-300
                                    
                                    /* Hover: 描述文字变深色 */
                                    group-hover:text-black/80
                                `}>
                                    {project.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );

                    return project.detail ? (
                        <Link
                            href={`/project/${project.slug}`}
                            key={index}
                            className="block group"
                        >
                            {card}
                        </Link>
                    ) : (
                        <div key={index} className="block group cursor-default">
                            {card}
                        </div>
                    );
                })}
            </div>
        </section>
    )
}