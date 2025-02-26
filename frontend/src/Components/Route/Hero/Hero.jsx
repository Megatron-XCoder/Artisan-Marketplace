import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../Styles/Styles.jsx";

const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const media = [
        { type: "image", url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg" },
        { type: "video", url: "https://videos.pexels.com/video-files/8580866/8580866-hd_1920_1080_30fps.mp4" }, // Replace with your video URL
        { type: "image", url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg" },
        { type: "video", url: "https://videos.pexels.com/video-files/5956876/5956876-uhd_2560_1440_25fps.mp4" }, // Replace with your video URL
        { type: "image", url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg" },
        { type: "video", url: "https://videos.pexels.com/video-files/6336596/6336596-uhd_2560_1440_25fps.mp4" }, // Replace with your video URL

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % media.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [activeSlide, media.length]);

    return (
        <div className="relative min-h-[70vh] 800px:min-h-[80vh] w-full overflow-hidden mb-4">
            {/* Carousel Media (Images and Videos) */}
            {media.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === activeSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {item.type === "image" ? (
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${item.url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    ) : (
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                        >
                            <source src={item.url} type="video/mp4" />
                            <source src={item.url.replace(".mp4", ".webm")} type="video/webm" />
                            <source src={item.url.replace(".mp4", ".ogg")} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            ))}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex lg:pl-24 items-end lg:items-center justify-center text-start md:justify-start md:text-left">
                <div className="w-[90%] 800px:w-[60%]">
                    <h1 className="text-[30px] leading-[1.2] lg:text-[40px] text-white drop-shadow-md font-[600] capitalize">
                        Best Collection for <br /> home Decoration
                    </h1>
                    <p className="pt-5 text-[14px] lg:text-[18px] font-[300] text-white drop-shadow-md">
                        More Than Just Shopping – Artisan Marketplace is a Movement to Support Local Creators,
                        <br /> Preserve Traditional Skills, Promote Sustainable Living. Where Every Stitch, Carve,
                        <br /> and Brushstroke Holds a Story– Experience the Magic of Handmade Artisan Products.
                    </p>
                    <Link to="/products" className="inline-block">
                        <div className={`${styles.button} mt-5`}>
                            <span className="text-[#fff] text-[18px]">
                                Shop Now
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;