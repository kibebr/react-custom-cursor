import React from 'react'
import { render } from 'react-dom'
import { MousePosProvider, CursorWrapper } from '../../src/components'
import './index.css'

const App = () => (
  <MousePosProvider>
    <div className='max-w-screen-lg p-5 md:p-10 antialiased'>
      <h1 className='font-bold text-3xl md:text-4xl'>react-custom-cursor</h1>
      <CursorWrapper element={<div className='w-24 h-24 rounded-full'></div>}>
        <div className='w-96 h-96 bg-red-200'>
          Hover here
        </div>
      </CursorWrapper>
    </div>
  </MousePosProvider>
)

render(<App />, document.getElementById('root'))
