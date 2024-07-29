import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLogPageLeave = (pageName) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const confirmationMessage = 'Nếu load lại trang thì bạn sẽ phải mua lại!';
            event.returnValue = confirmationMessage; // Chrome requires returnValue to be set.
            return confirmationMessage;
        };

        const checkLocation = () => {
            if (location.pathname !== pageName) {
                console.log(`Bạn đã rời khỏi trang ${pageName}`);
                localStorage.removeItem('cartnow');
            }
        };

        const handlePopState = () => {
            if (location.pathname === pageName) {
                const check = window.confirm('Nếu load lại trang thì bạn sẽ phải mua lại!');
                if (!check) {
                    localStorage.removeItem('cartnow');
                    navigate('/');
                }
            } else {
                checkLocation();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('pushstate', handlePopState); // Optional: In case pushstate is used

        // Kiểm tra khi location thay đổi
        checkLocation();

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('pushstate', handlePopState);
        };
    }, [location, pageName, navigate]);
};
