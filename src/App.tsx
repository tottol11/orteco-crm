import { useState } from 'react'
import Sidebar from './components/Sidebar'
import RequestsScreen from './components/RequestsScreen'
import RequestDetailScreen from './components/RequestDetailScreen'
import WarehouseScreen from './components/WarehouseScreen'

export type Screen = 'requests' | 'request-detail' | 'warehouse'

export default function App() {
  const [screen, setScreen] = useState<Screen>('requests')

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f3f4f6' }}>
      <Sidebar screen={screen} setScreen={setScreen} />
      <main className="flex-1 overflow-y-auto">
        {screen === 'requests' && <RequestsScreen onOpenRequest={() => setScreen('request-detail')} />}
        {screen === 'request-detail' && <RequestDetailScreen onBack={() => setScreen('requests')} onWarehouse={() => setScreen('warehouse')} />}
        {screen === 'warehouse' && <WarehouseScreen />}
      </main>
    </div>
  )
}
