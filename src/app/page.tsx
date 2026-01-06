'use client';

// import { useEffect } from 'react';
import Image from 'next/image';
import Btn from './components/button/btn';
import SkillItem from './partials/skill/skill-item';
import { skills } from './partials/skill/skill-list';
import Heading from './components/heading/heading';
import ProjectItem from './partials/project/project-item';
import { Projects } from './partials/project/project-list';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { achives } from './partials/achive/achiveList';
import AchiveItem from './partials/achive/achiveItem';
import TextType from './components/ui/reactbits/textType/textType';
import ProfileCard from './components/ui/reactbits/profileCard/profileCard';
// import Lenis from 'lenis';
import MotionIf from './customHook/motionIf';
import ScrollVelocity from './components/ui/reactbits/scrollVecocity/scrollVelocity';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
    // useEffect(() => {
    //     const lenis = new Lenis({
    //         duration: 0.4,
    //         easing: t => 1 - Math.pow(1 - t, 3)
    //     });

    //     function raf(time: number) {
    //         lenis.raf(time);
    //         requestAnimationFrame(raf);
    //     }

    //     requestAnimationFrame(raf);
    // }, []);

    const projectFeature = Projects.find(item => item.topic === 'project-feature');
    const projectEcommerce = Projects.find(item => item.topic === 'project-ecommerce');
    const projectProxy = Projects.find(item => item.topic === 'project-proxy');
    const projectIntroduce = Projects.find(item => item.topic === 'project-introduce');

    return (
        <>
            {/* section intro */}
            <section className="sec-hero" id="about">
                <div className="hero ss-pd">
                    <div className="container">
                        <div className="hero-wrap flex flex-wrap -m-6">
                            <div className="col-lf w-full lg:w-[50%] p-6">
                                <div className="col-lf-wrap h-full">
                                    <div className="intro-title flex flex-col justify-center lg:items-start items-center h-full mt-10 gap-y-12 max-2xl:gap-y-8 max-2xl:mt-0">
                                        <MotionIf
                                            initial={{ opacity: 0, scale: 0, y: 100 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: 0.2
                                            }}
                                            viewport={{ once: true, amount: 0.3 }}
                                        >
                                            <h2 className="title-lg text-7xl font-medium italic max-md:text-4xl">
                                                Xin chào, mình là Thiện
                                            </h2>
                                        </MotionIf>
                                        <MotionIf
                                            className="sub-text text-3xl sm:text-5xl font-semibold"
                                            initial={{ opacity: 0, scale: 0, y: 100 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: 0.4
                                            }}
                                            viewport={{ once: true, amount: 0.3 }}
                                        >
                                            Hiện tại mình là
                                            <span className="cl-pri">
                                                <TextType
                                                    text={[' Front End Developer', ' UI/UX Developer', ' coder']}
                                                    typingSpeed={55}
                                                    pauseDuration={1000}
                                                    initialDelay={500}
                                                />
                                            </span>
                                        </MotionIf>
                                        <MotionIf
                                            initial={{ opacity: 0, scale: 0, y: 100 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: 0.6
                                            }}
                                            viewport={{ once: true, amount: 0.3 }}
                                        >
                                            <Btn href="/#achive" className={`btn-pri border-ln`}>
                                                <span className="txt">Khám phá</span>
                                            </Btn>
                                        </MotionIf>
                                    </div>
                                </div>
                            </div>
                            <div className="col-rt w-full lg:w-[50%] p-6">
                                <div className="col-rt-wrap flex justify-center lg:justify-end">
                                    <MotionIf
                                        initial={{ opacity: 0, scale: 0, y: 100 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                            duration: 1,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        viewport={{ once: true, amount: 0.3 }}
                                    >
                                        <ProfileCard
                                            name="Phúc Thiện"
                                            title="Front End developer"
                                            handle="Thiện"
                                            status="Online"
                                            contactText="Liên hệ"
                                            avatarUrl="images/thien.jpg"
                                            showUserInfo={true}
                                            enableTilt={true}
                                            enableMobileTilt={false}
                                            onContactClick={() => {
                                                window.open('https://zalo.me/0773188858', '_blank');
                                            }}
                                        />
                                    </MotionIf>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-scroll-velocity">
                <div className="scroll-velocity ss-pd-b">
                    <ScrollVelocity
                        texts={['Scroll Down', 'Scroll Down']}
                        velocity={50}
                        className="custom-scroll-text"
                    />
                </div>
            </section>

            {/* section about me */}
            <section className="sec-about-me" id="achive">
                <div className="about-me relative ss-pd-b">
                    <div className="bg-ab absolute top-0 left-0 w-full h-full object-cover mix-blend-lighten">
                        <Image src="images/earth.png" alt="earth.png" width={1728} height={851} />
                    </div>
                    <div className="container">
                        <div className="about-me-wrap">
                            <Heading title="Giới thiệu" classTitle="title-pri" classCustom="mb-8">
                                <p className="desc text-4xl leading-[120%] max-2xl:text-3xl">
                                    Trước hết, hãy để tôi tự giới thiệu. Tôi là một lập trình viên front-end đến từ
                                    <br className="max-lg:hidden" />
                                    tự học, không có bằng đại học. Nhờ những nỗ lực của mình, tôi đã
                                    <br className="max-lg:hidden" />
                                    đạt được những gì tôi có ngày hôm nay. Tôi hy vọng rằng hoàn cảnh khó khăn của tôi
                                    không phải là rào cản
                                    <br className="max-lg:hidden" />
                                </p>
                            </Heading>
                            <div className="achive-list-wrap">
                                <div className="achive-list row">
                                    {achives.map((item, index) => (
                                        <div className="col" key={index}>
                                            <MotionIf
                                                initial={{ opacity: 0, scale: 0, y: 100 }}
                                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 0.1 * index
                                                }}
                                                viewport={{ once: true, amount: 0.3 }}
                                            >
                                                <AchiveItem
                                                    dataUnit={item.dataUnit}
                                                    number={item.numberAchive}
                                                    text={item.text}
                                                ></AchiveItem>
                                            </MotionIf>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section skills */}
            <section className="sec-skill" id="skills">
                <div className="skill relative ss-pd-b">
                    <div className="container">
                        <div className="skill-wrap">
                            <Heading title="Các kĩ năng" classTitle="title-pri" classCustom="mb-8"></Heading>
                            <div className="skill-list row">
                                {skills.map((item, index) => (
                                    <div className="col" key={index}>
                                        <MotionIf
                                            initial={{ opacity: 0, y: 100 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 1,
                                                // ease: [0.16, 1, 0.3, 1],
                                                delay: 0.1 * index
                                            }}
                                            viewport={{ once: true, amount: 0.3 }}
                                        >
                                            <SkillItem icon={item.icon} text={item.text}></SkillItem>
                                        </MotionIf>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section projects*/}
            <section className="sec-pj" id="projects">
                {/* section projects feature*/}
                <div className="pj ss-pd-b">
                    <div className="container">
                        <div className="pj-wrap">
                            <Heading title="Dự án nổi bật" classTitle="title-pri" classCustom={'mb-8'}></Heading>
                            <Swiper
                                className="row rows-3"
                                slidesPerView="auto"
                                effect="slide"
                                speed={800}
                                modules={[Pagination, Autoplay]}
                                autoplay={{
                                    delay: 8000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                                    clickable: true
                                }}
                            >
                                {projectFeature?.list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <ProjectItem
                                            href={item.link}
                                            thumbNail={item.thumbNail}
                                            title={item.title}
                                            description={item.description}
                                        ></ProjectItem>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* section projects ecommerce */}
                <div className="pj ss-pd-b">
                    <div className="container">
                        <div className="pj-wrap">
                            <Heading title="Dự án bán hàng" classTitle="title-pri" classCustom={'mb-8'}></Heading>
                            <Swiper
                                className="row rows-3"
                                slidesPerView="auto"
                                effect="slide"
                                speed={800}
                                modules={[Pagination, Autoplay]}
                                autoplay={{
                                    delay: 8000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                                    clickable: true
                                }}
                            >
                                {projectEcommerce?.list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <ProjectItem
                                            href={item.link}
                                            thumbNail={item.thumbNail}
                                            title={item.title}
                                            description={item.description}
                                        ></ProjectItem>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* section project proxy */}
                <div className="pj ss-pd-b">
                    <div className="container">
                        <div className="pj-wrap">
                            <Heading title="Dự án proxy" classTitle="title-pri" classCustom={'mb-8'}></Heading>
                            <Swiper
                                className="row rows-3"
                                slidesPerView="auto"
                                effect="slide"
                                speed={800}
                                modules={[Pagination, Autoplay]}
                                autoplay={{
                                    delay: 8000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                                    clickable: true
                                }}
                            >
                                {projectProxy?.list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <ProjectItem
                                            href={item.link}
                                            thumbNail={item.thumbNail}
                                            title={item.title}
                                            description={item.description}
                                        ></ProjectItem>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* section prroject introduce */}
                <div className="pj ss-pd-b">
                    <div className="container">
                        <div className="pj-wrap">
                            <Heading title="Dự án giới thiệu" classTitle="title-pri" classCustom={'mb-8'}></Heading>
                            <Swiper
                                className="row rows-3"
                                slidesPerView="auto"
                                effect="slide"
                                speed={800}
                                modules={[Pagination, Autoplay]}
                                autoplay={{
                                    delay: 8000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                                    clickable: true
                                }}
                            >
                                {projectIntroduce?.list?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <ProjectItem
                                            href={item.link}
                                            thumbNail={item.thumbNail}
                                            title={item.title}
                                            description={item.description}
                                        ></ProjectItem>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
