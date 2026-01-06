import { ReactNode } from 'react';
import SplitText from '../ui/reactbits/splitText/splitText';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

interface HeadingProps {
    title?: string;
    classTitle?: string;
    classCustom?: string;
    children?: ReactNode;
}

export default function Heading({ title, classTitle, classCustom, children }: HeadingProps) {
    return (
        <div className={`heading-sec ${classCustom || ''}`}>
            <div className="heading-wrap text-center text-balance lg:text-pretty ">
                <SplitText
                    text={`${title}`}
                    className={`title-global ${classTitle || ''}`}
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    tag="h2"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                {children}
            </div>
        </div>
    );
}
