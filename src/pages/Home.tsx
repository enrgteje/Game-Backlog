import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import BacklogTable from '../components/BacklogTable/BacklogTable';
import { useState } from 'react';

interface GameInfo {
    id: number;
    title: string;
    platform: string;
    completed: boolean;
}
const games: GameInfo[] = [
    { id: 1, title: 'Snow', platform: 'Jon', completed: true },
    { id: 2, title: 'Lannister', platform: 'Cersei', completed: false },
    { id: 3, title: 'Lannister', platform: 'Jaime', completed: false },
];

const Home: React.FC = () => {
    const { user, logout } = useAuth();
    const [gameData, setGameData] = useState<GameInfo[]>(games);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    }

    const handleToggleCompleted = (id: number) => {
        setGameData((prev) =>
          prev.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g
          )
        );
    };

    const handleRemove = (id: number) => {
        console.log(id);
        let newGames = gameData.filter((g) => g.id !== id);
        console.log(newGames);
        setGameData(newGames);
    };

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Home</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <h1>Welcome to your backlog</h1>
            {user && <p>You're currently signed in as <strong>{user.email}</strong></p>}

            <IonButton onClick={handleLogout}>Sign out</IonButton>

            <BacklogTable
                games={gameData}
                onToggleCompleted={handleToggleCompleted}
                onRemove={handleRemove}></BacklogTable>
        </IonContent>
    </IonPage>
    );
};

export default Home;
