import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AuthProvider } from '@/Components/Contexts/AuthContext';
import { UserProvider } from '@/Components/Contexts/UserContext';
import { CallSheetProvider } from '@/Components/Contexts/CallSheetContext';
import { RecipientProvider } from '@/Components/Contexts/RecipientContext';
import { CallSheetLocationProvider } from '@/Components/Contexts/CallSheetLocationContext';
import { ModalProvider } from '@/Components/Contexts/ModalContext';
import { SnackProvider } from '@/Components/Contexts/SnackContext';
import { DarkModeProvider } from '@/Components/Contexts/DarkModeContext';
import { DrawerProvider } from '@/Components/Contexts/DrawerContext';
import { ScheduleProvider } from '@/Components/Contexts/ScheduleContext';
import { ProjectProvider } from '@/Components/Contexts/ProjectContext';
import { MediaProvider } from '@/Components/Contexts/MediaContext';
import { TaskProvider } from '@/Components/Contexts/TaskContext';
import { ClientProvider } from '@/Components/Contexts/ClientContext';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AuthProvider>
            <UserProvider>
                <ProjectProvider>
                <MediaProvider>
                    <ClientProvider>
                        <ModalProvider>
                            <SnackProvider>
                                <DarkModeProvider>
                                    <CallSheetProvider>
                                        <RecipientProvider>
                                            <CallSheetLocationProvider>
                                                <DrawerProvider>
                                                    <ScheduleProvider>
                                                        <TaskProvider>
                                                            
                                                            <App {...props} />

                                                        </TaskProvider>
                                                    </ScheduleProvider>
                                                </DrawerProvider>
                                            </CallSheetLocationProvider>
                                        </RecipientProvider>
                                    </CallSheetProvider>
                                </DarkModeProvider>
                            </SnackProvider>
                        </ModalProvider>
                    </ClientProvider>
                </MediaProvider>
                </ProjectProvider>
            </UserProvider>
            </AuthProvider>
        );

    },
    progress: {
        color: '#4B5563',
    },
});
 