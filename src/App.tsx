import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Never from './games/never/Never'
import King from './games/king/King'
import Picolo from './games/picolo/Picolo'
import TruthOrDare from './games/truth-or-dare/TruthOrDare'
import Who from './games/who/Who'
import MostLikely from './games/most-likely/MostLikely'
import WouldYouRather from './games/would-you-rather/WouldYouRather'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/never" element={<Never />} />
      <Route path="/king" element={<King />} />
      <Route path="/picolo" element={<Picolo />} />
      <Route path="/truth-or-dare" element={<TruthOrDare />} />
      <Route path="/who" element={<Who />} />
      <Route path="/most-likely" element={<MostLikely />} />
      <Route path="/would-you-rather" element={<WouldYouRather />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
