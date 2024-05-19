import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const characters = "!@#$%^&*";


    if(charAllowed) str += characters;
    if(numberAllowed) str += numbers;

    for(let i=1; i < length;i++) {
        let charIndex = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(charIndex); 
    }
    setPassword(pass);
  }, [length ,charAllowed, numberAllowed])

  useEffect(()=> {
    generatePassword();
  }, [length, charAllowed, numberAllowed])

  const codeCopier = function () {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      alert("Password Copied Successfully");
  }

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
         <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef}
         readOnly/>
         <button onClick={codeCopier}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
               <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=> setLength(e.target.value)} name="" id="length" />
               <label htmlFor="length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
               <input type="checkbox" name="" defaultChecked={numberAllowed} 
               onChange={() => {
                setNumberAllowed(prev => !prev);
               }} id="" />
               <label htmlFor="number">Numbers {numberAllowed}</label>
          </div>
          <div className='flex items-center gap-x-1'>
               <input type="checkbox" name="" defaultChecked={charAllowed} 
               onChange={() => {
                setCharAllowed(prev => !prev);
               }} id="" />
               <label htmlFor="charInput">character {numberAllowed}</label>
          </div>
      </div>
     </div>
    </>
  )
}

export default App
