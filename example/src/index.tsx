import React from 'react'
import { render } from 'react-dom'
import { MousePosProvider, CursorWrapper } from 'react-ponteiro'
import './index.css'

const Separator = () => (
  <div className='my-5'></div>
)

const App = () => (
  <MousePosProvider>
    <div className='max-w-screen-lg p-5 md:p-10 antialiased'>
      <h1 className='font-bold text-3xl md:text-4xl'>react-custom-cursor</h1>
      <Separator />
      <CursorWrapper settings={{ keepOriginal: false }} element={'Cool!'}>
        <div className='w-96 h-96 bg-red-200'>
          Hover here
        </div>
      </CursorWrapper>
    </div>
  </MousePosProvider>
)

render(<App />, document.getElementById('root'))
