import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLogPageLeave = (pageName:any) => {
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = (event:any) => {
            console.log(`Bạn đã rời khỏi trang ${pageName}`);
            localStorage.removeItem('cartnow');
        };

        const checkLocation = () => {
            if (location.pathname !== pageName) {
                console.log(`Bạn đã rời khỏi trang ${pageName}`);
                localStorage.removeItem('cartnow');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', checkLocation);

        // Kiểm tra khi location thay đổi
        checkLocation();

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', checkLocation);
        };
    }, [location, pageName]);
};
