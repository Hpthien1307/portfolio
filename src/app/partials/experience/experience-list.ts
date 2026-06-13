export interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
    tasks: string[];
    projects?: {
        name: string;
        url: string;
    }[];
    tools: string[];
}

export const experiences: ExperienceItem[] = [
    {
        company: 'Mona Media',
        position: 'Front-end developer',
        duration: '8/2023 - 6/2026',
        tasks: [
            'Tham gia vận hành nhiều dự án đa dạng chủ đề như: giáo dục, proxy, giới thiệu doanh nghiệp, bán hàng, nhà hàng, du lịch, v.v.',
            'Tập trung phát triển các giao diện tương tác cao, tối ưu hiệu năng và khả năng phản hồi responsive.',
            'Phối hợp thiết kế và triển khai giải pháp UI/UX tốt nhất cho người dùng cuối.'
        ],
        projects: [
            { name: 'Học viện hàng không Việt Nam (VAA)', url: 'https://vaa.edu.vn/' },
            { name: 'Dynasty House Dim Sum & Hot Pot', url: 'https://www.dynastyhouse.com.vn/' },
            { name: 'Chăm sóc sức khỏe Việt', url: 'https://chamsocsuckhoeviet.vn/' },
            { name: 'Robohub Vietnam', url: 'https://robohub.vn/' }
        ],
        tools: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Sass/SCSS', 'GSAP', 'Library JS']
    },
    {
        company: 'Namtech',
        position: 'Front-end developer',
        duration: '10/2021 - 6/2022',
        tasks: [
            'Tham gia phát triển các dự án quốc tế và website giới thiệu sản phẩm.',
            'Tối ưu hóa mã nguồn và cập nhật các giao diện website cũ lên chuẩn hiện đại.',
            'Nghiên cứu và phát triển trải nghiệm người dùng (UI/UX) trực quan và sinh động.'
        ],
        projects: [
            { name: 'Photoloco Australia', url: 'https://photoloco.com.au/' },
            { name: 'The Natives', url: 'https://thenatives.com.au/' },
            { name: 'Namtech Reveal Group Project', url: 'https://namtech.com.au/projects/reveal-group/' }
        ],
        tools: ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'Bootstrap', 'GSAP', 'Library JS']
    }
];
