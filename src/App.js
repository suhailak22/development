import './App.css';
import Header from './components/header/Header';
import BestOffers from './components/pages/content/best-offers/BestOffer';
import OurProjects from './components/pages/content/our-projects/OurProjects';
import TopProjects from './components/pages/content/our-projects/sub-components/albion-top-projects/TopProjects';
import Footer from './components/footer/Footer';
import IntroCard from './components/pages/introcard/IntroCard';

function App() {
  return (
    <div className="App">
      <Header/>
      <IntroCard/>
      <BestOffers/>
      <OurProjects/>
      <Footer/>
    </div>
  );
}

export default App;
