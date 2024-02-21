import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AuthProvider } from '@/Components/Contexts/AuthContext';
import { CallSheetProvider } from '@/Components/Contexts/CallSheetContext';
import { CallSheetLocationProvider } from '@/Components/Contexts/CallSheetLocationContext';
import { ModalProvider } from '@/Components/Contexts/ModalContext';
import { SnackProvider } from '@/Components/Contexts/SnackContext';
import { DarkModeProvider } from '@/Components/Contexts/DarkModeContext';
import { DrawerProvider } from '@/Components/Contexts/DrawerContext';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AuthProvider>
                <ModalProvider>
                    <SnackProvider>
                        <DarkModeProvider>
                            <CallSheetProvider>
                                <CallSheetLocationProvider>
                                    <DrawerProvider>
                                        <App {...props} />
                                    </DrawerProvider>
                                </CallSheetLocationProvider>
                            </CallSheetProvider>
                        </DarkModeProvider>
                    </SnackProvider>
                 </ModalProvider>
             </AuthProvider>
        );

    },
    progress: {
        color: '#4B5563',
    },
});
 