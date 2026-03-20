import React from "react";

function Section({
                     title,
                     children,
                 }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-4">
                {title}
            </h2>
            <div className="text-gray-400 leading-relaxed space-y-2">
                {children}
            </div>
        </section>
    );
}

export default Section;
