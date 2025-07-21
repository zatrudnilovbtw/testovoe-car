import { FaArrowCircleUp } from "react-icons/fa";
import styles from './ScrollToTop.module.css';
import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}>
            <button 
                className={styles.button}
                onClick={scrollToTop}
                aria-label="Прокрутить вверх"
            >
                <FaArrowCircleUp size={40} />
            </button>
        </div>
    );
};

export default ScrollToTop;
