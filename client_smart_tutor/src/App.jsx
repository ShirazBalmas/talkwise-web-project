import { useState } from 'react'

import AccessibilityPanel from './components/Index/sections/AccessibilityPanel';
import Index from './components/Index/Index';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <AccessibilityPanel />
      <main className="main-content">
        <Index />
      </main>
    </div>
  )
}

export default App
