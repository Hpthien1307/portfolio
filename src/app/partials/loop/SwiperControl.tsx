import '@/scss/components/swiper.scss';

export default function SwiperControl() {
    return (
        <>
            <div className="swiper-control">
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev swiper-btn">
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="swiper-button-next swiper-btn">
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </>
    );
}
