import React, {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'

const defaultSettings: Settings = {
  keepOriginal: false,
  offsetX: 0,
  offsetY: 0
}

type Settings = {
  keepOriginal?: boolean,
  offsetX?: number,
  offsetY?: number
}

type Position = {
  x: number
  y: number
}

type CursorWrapperProps = {
  children: ReactNode
  element: ReactNode,
  settings?: SafelyMergedObject<Settings, typeof defaultSettings>
}

type MousePosProviderProps = {
  children: ReactNode
}


export function compactOptions<T extends { [key: string]: unknown }>(
  options?: T
): T | undefined {
  if (!options) {
    return options
  }

  const keys = Object.keys(options) as Array<keyof T>
  const compactKeys = keys.filter((key) => options[key] !== undefined)
  const compactEntries = compactKeys.map((key) => [key, options[key]])
  return Object.fromEntries(compactEntries)
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

export const CursorWrapper: FunctionComponent<CursorWrapperProps> = ({ settings, element, children }) => {
  const [inside, setInside] = useState<boolean>(false)
  const _settings = { ...defaultSettings, ...compactOptions(settings) }
  const parent = useRef<HTMLDivElement>(null)
  const mousePos = useContext(MousePosContext)

  useEffect(() => {
  }, [inside])

  const handleMouseEnter = () => {
    setInside(true)

    if (!_settings.keepOriginal) {
      document.body.style.cursor = "none"
    }
  }

  const handleMouseOut = () => {
    setInside(false)
    document.body.style.cursor = "auto"
  }

  return (
    <>
      <div
        ref={parent}
        onMouseEnter={handleMouseEnter}
        // onMouseMove={(event) => handleMouseMove(event)}
        onMouseLeave={handleMouseOut}
        style={{ background: 'yellow', width: 'auto' }}
      >
        {children}
        {inside && (
        <div
          style={{
            position: "absolute",
            left: `${mousePos.x + _settings.offsetX}px`,
            top: `${mousePos.y + _settings.offsetY}px`
          }}
        >
          {element}
        </div>
      )}
      </div>
    </>
  )
}
