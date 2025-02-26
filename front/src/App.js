import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import NotFound from './pages/NotFound/NotFound';
import Boutique from './pages/Boutique/Boutique';
import Commande from './pages/Commande/commande';
import Details from './pages/Details/Detail';
import Inscription from './pages/Utilisateurs/Inscription';
import Connexion from './pages/Utilisateurs/Connexion';
import Confirmation from './pages/Confirmation/Confirmation';
import MesCommandes from './pages/MesCommandes/MesCommandes';
import MonProfil from './pages/MonProfil/MonProfil';
import VerificationEmail from './pages/Verification/VerificationEmail';
import TestFormulaire from './stripe/TestFormulaire';
import Renvoi from './pages/Utilisateurs/Renvoi';
import Contact from './pages/Contact/Contact';
import NousConnaitre from './pages/NousConnaitre/NousConnaitre';
import PrendreRendezVous from './pages/PrendreRendez-Vous/PrendreRendezVous';
import ModaleCookies from './components/ModaleCookies/ModaleCookies';

import Layout from './components/Layout';
import RoutesPubliques from './components/RoutesPubliques';
import RoutesProtegees from './components/RoutesProtegees';
import RoutesConnexion from './components/RoutesConnexion';

import Dashboard from './pages/Dashboard/Dashboard';
import Items from './pages/Dashboard/Items';
import UpdateItems from './pages/Dashboard/UpdateItems';
import Utilisateurs from './pages/Dashboard/Utilisateurs';
import AjoutUtilisateur from './pages/Dashboard/Users';
import UpdateUsers from './pages/Dashboard/UpdateUsers';
import CommandeDashboard from './pages/Dashboard/CommandeDashboard';
import CommandeUpdate from "./pages/Dashboard/CommandeUpdate";
import CommandeUtilisateur from './pages/Dashboard/CommandeUtilisateur';
import Messages from './pages/Dashboard/Messages';
import Abonnes from './pages/Dashboard/Abonnes';

function App() {
  return (
    <>
      <ModaleCookies />

      <Routes>
        {/* Routes constamment disponibles */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Boutique />} />  {/* Page principale */}
          <Route path="/details/:id" element={<Details />} />
          <Route path="/verification/:token" element={<VerificationEmail />} />
          <Route path="/renvoi" element={<Renvoi />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nous-connaitre" element={<NousConnaitre />} />
          <Route path="/rendez-vous" element={<PrendreRendezVous />} />
          <Route path="*" element={<NotFound />} />  {/* Page NotFound */}
        </Route>

        <Route element={<RoutesConnexion />}>
          <Route path="/commande" element={<Commande />} />
          <Route path="/mescommandes/:id" element={<MesCommandes />} />
          <Route path="/monprofil/:id" element={<MonProfil />} />
          <Route path="/commande/paiement" element={<TestFormulaire />} />
          <Route path="/commande/paiement/confirmation/:id" element={<Confirmation />} />
        </Route>

        {/* Routes publiques */}
        <Route element={<RoutesPubliques />}>
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
        </Route>

        {/* Routes protégées */}
        <Route element={<RoutesProtegees />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="items" element={<Items />} />
            <Route path="utilisateurs" element={<Utilisateurs />} />
            <Route path="commande" element={<CommandeDashboard />} />
            <Route path="update/commande/:id" element={<CommandeUpdate />} />
            <Route path="commande/utilisateur/:id" element={<CommandeUtilisateur />} />
            <Route path="update/item/:id" element={<UpdateItems />} />
            <Route path="ajout" element={<AjoutUtilisateur />} />
            <Route path="update/utilisateur/:id" element={<UpdateUsers />} />
            <Route path="messages" element={<Messages />} />
            <Route path="abonnement" element={<Abonnes />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
