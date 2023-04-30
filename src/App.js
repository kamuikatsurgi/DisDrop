import logo from './logo.svg';
import HeaderComponent from './components/HeaderComponent';
import './App.css';
import HeroSectionComponent from './components/HeroSectionComponent';
import CreateDisDropSection from './components/CreateDisdropSection';
import FeatureSectionComponent from './components/FeaturesSectionComponent';

function App() {
  return (
    <div className="">
      <HeaderComponent />
      <HeroSectionComponent />
      <CreateDisDropSection />
      <FeatureSectionComponent />
    </div>
  );
}

export default App;
