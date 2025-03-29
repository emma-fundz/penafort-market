
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    
    // Apply enter animation to the page content
    const pageContent = document.getElementById('page-content');
    if (pageContent) {
      pageContent.classList.add('animate-fade-in');
      
      const timeout = setTimeout(() => {
        pageContent.classList.remove('animate-fade-in');
      }, 700); // Animation duration
      
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  return (
    <div id="page-content" className="min-h-screen">
      {children}
    </div>
  );
};

export default PageTransition;
