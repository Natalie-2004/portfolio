import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
    { icon: <FaGithub />, path: "https://github.com/Natalie-2004" },
    { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/lixuan-ye-926853236/" },
    { icon: <Mail />, path: "mailto:1103625169lixuan@gmail.com" },
]

const Socials = (
    { containerStyles, iconStyles } : { containerStyles: string, iconStyles: string }
) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return (
                    <Link key={index} href={item.path} className={iconStyles} target="_blank">
                        {item.icon}
                    </Link>
                )
            })}
        </div>
    )
}

export default Socials;