import { useScrollToTop } from '../hooks/useScrollToTop';
import { FaArrowUp } from "react-icons/fa";
import styles from './ScrollToTopBtn.module.css';

function ScrollToTopBtn() {

    const { isVisible, scrollToTop } = useScrollToTop(300);

    if (!isVisible) return null;

    return (
        <button
            type="button"
            className={styles.scrollUpBtn}
            onClick={scrollToTop}
            aria-label="Torna in alto"
        >
            <FaArrowUp />
        </button>
    );
}
export default ScrollToTopBtn;