import Image from 'next/image';
import Link from 'next/link';

type ProjectItemProps = {
    href?: string;
    thumbNail?: string;
    title?: string;
    description?: string;
};

export default function ProjectItem({ href, thumbNail, title, description }: ProjectItemProps) {
    return (
        <div className="pj-item h-full">
            <div className="inner border-ln h-full flex flex-col">
                <div className="thumb">
                    <Link
                        href={href ? href : '/'}
                        className="thumb-link relative overflow-hidden block pt-[56%]"
                        target="_blank"
                    >
                        <Image
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full! object-cover"
                            src={thumbNail ? `images/${thumbNail}` : 'images/thumbNail_default.jpg'}
                            alt={title ? title : 'project title'}
                            width={427}
                            height={239}
                        />
                    </Link>
                </div>
                <div className="content white h-full flex flex-col justify-between">
                    <h3 className="mb-4">
                        <a
                            href={href ? href : '/'}
                            className="pj-tt font-medium transition-all duration-300 max-2xl:text-4xl max-2xl:leading-[125%]"
                            target="_blank"
                        >
                            {title ? title : 'project title'}
                        </a>
                    </h3>
                    <p className="desc">{description ? description : 'project description'}</p>
                </div>
            </div>
        </div>
    );
}
