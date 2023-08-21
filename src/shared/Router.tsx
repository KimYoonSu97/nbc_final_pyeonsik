import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../pages/Home'
import Sign from '../pages/Sign'
import Detail from '../pages/Detail'

const Router = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/sign' element={<Sign/>}></Route>
                <Route path='/detail/:postId' element={<Detail/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router