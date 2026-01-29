import Image from 'next/image';
import { skillItemProps } from '@/app/types/skill-type';

export default function SkillItem({ icon, text, ...props }: skillItemProps) {
    return (
        <div className="skill-item" {...props}>
            <div className="inner border-ln flex flex-col items-center gap-6">
                <div className="icon w-20 h-20 shrink-0 flex max-2xl:w-16">
                    <Image
                        className="w-full h-full object-contain"
                        src={`images/${icon}`}
                        alt={`${text}`}
                        width={50}
                        height={50}
                    />
                </div>
                <h3 className="tt text-4xl font-semibold text-center max-2xl:text-3xl">{text}</h3>
            </div>
        </div>
    );
}
