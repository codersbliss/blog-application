import { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fab
      color="primary"
      aria-label="scroll to top"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: visible ? 'block' : 'none',
      }}
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </Fab>
  );
};

export default ScrollToTopButton;
