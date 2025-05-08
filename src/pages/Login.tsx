import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const { login } = useAuth();
    const handleLogin = async () => {
        try {
            await login(email, password);
            history.push('/home');
        }
        catch (error) {
            console.error('Login error: ', error);
        }
    };

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Login</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonHeader collapse="condense">
            <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonItem>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput
             value={email}
             onIonChange={(e) => setEmail(e.detail.value!)}
             type='email'
            />
        </IonItem>
        <IonItem>
            <IonLabel position='floating'>Passsword</IonLabel>
            <IonInput
             value={password}
             onIonChange={(e) => setPassword(e.detail.value!)}
             type='password'
            />
        </IonItem>
        <IonButton onClick={handleLogin}>Login</IonButton>
        </IonContent>
    </IonPage>
    );
};

export default LoginPage;
