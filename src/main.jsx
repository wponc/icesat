import React, { useRef, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { Canvas, useLoader} from '@react-three/fiber'
import { OrbitControls, Bounds, Center, Loader, useProgress, Html  } from '@react-three/drei'
import { PCDLoader } from 'three-stdlib'
import { EffectComposer, Bloom, ToneMapping, Noise, DepthOfField, Vignette } from '@react-three/postprocessing'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function App() {

  return (
    <>
      <Overlay /> 
      <Canvas
        className='r3f'
        camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 2]
        } }
        >
        <Experience />
      </Canvas>
    </>
  )
}

function Overlay(){
  return(
  <>    
    <div className="navbar">
      <div className="nav-item" id="menu-button">
          <span className ="material-symbols-outlined">
              blur_on
          </span>
          <div className="dropdown-content">
                  <a href="https://experience.will.limited">experience</a>
                  <a href="https://projects.will.limited">projects</a>
                  <a href="https://about.will.limited">personal</a>
          </div>
        </div>
        <div className="nav-item">
            <a href="mailto:willdotlimited@gmail.com">contact</a>
        </div>
      </div>
    {/* <div className="title">
      <h1>ICESat</h1>
    </div> */}
  </>
  )
}

function PointCloud() {
  const PointCloud = useLoader(PCDLoader, './cloud.pcd')
  const cloud = useRef()


  return (
    <primitive 
      object={PointCloud} 
      rotation-x={-Math.PI * 0.5}
      rotation-z={Math.PI / 4}
      material-color={'white'}
      scale={.05}
      ref={cloud} 
    />
  )
}

function Experience() {
  return (
    <>

    <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={450} intensity={2}/>
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
    <OrbitControls
      autoRotate
      autoRotateSpeed={0.15}
      enablePan={false}
      enableZoom={false}
      enableRotate={false}
    />
    {/* <Bounds fit clip observe> */}
      <Center>
        <PointCloud />
      </Center>
    {/* </Bounds> */}
    </>
  )
}

