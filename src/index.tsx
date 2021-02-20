import React, {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'

type CursorWrapperProps = {
  children: ReactNode
  element: ReactNode
}

type MousePosProviderProps = {
  children: ReactNode
}

type Position = {
  x: number
  y: number
}

const MousePosContext = createContext<Position>({ x: 100, y: 50 })

export const MousePosProvider: FunctionComponent<MousePosProviderProps> = ({ children }) => {
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 })

  document.onmousemove = ({ pageX, pageY }) => {
    setMousePos({ x: pageX, y: pageY })
  }

  return (
    <MousePosContext.Provider value={mousePos}>
      {children}
    </MousePosContext.Provider>
  )
}

export const CursorWrapper: FunctionComponent<CursorWrapperProps> = ({ element, children }) => {
  const [inside, setInside] = useState<boolean>(false)
  const parent = useRef<HTMLDivElement>(null)
  const mousePos = useContext(MousePosContext)

  useEffect(() => {
    console.log('test')
  }, [inside])

  const handleMouseEnter = () => {
    setInside(true);
    document.body.style.cursor = "none"
  }

  const handleMouseOut = () => {
    setInside(false);
    document.body.style.cursor = "auto"
  }

  return (
    <>
      <div
        ref={parent}
        onMouseEnter={handleMouseEnter}
        // onMouseMove={(event) => handleMouseMove(event)}
        onMouseLeave={handleMouseOut}
        style={{ background: 'yellow' }}
      >
        {children}
        {inside && (
        <div
          style={{
            position: "absolute",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`
          }}
        >
          {element}
        </div>
      )}
      </div>
    </>
  )
}
