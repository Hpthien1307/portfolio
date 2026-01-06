import CountUp from '@/app/components/ui/reactbits/countUp/countUp';

type achive = {
    dataUnit?: string;
    number?: number;
    text?: string;
};

export default function AchiveItem({ dataUnit, number = 0, text }: achive) {
    return (
        <div className="achive-item">
            <div className="inner border-ln flex flex-col items-center justify-center gap-y-6">
                <div className="achive-num">
                    <span
                        className="num font-bold text-7xl flex items-center gap-x-2  max-md:text-6xl"
                        data-unit={dataUnit}
                    >
                        <CountUp
                            from={0}
                            to={number}
                            separator=","
                            direction="up"
                            duration={1.6}
                            delay={0.6}
                            className="count-up-text"
                        />
                    </span>
                </div>
                <p className="txt text-center font-medium text-4xl max-md:text-3xl">{text}</p>
            </div>
        </div>
    );
}
