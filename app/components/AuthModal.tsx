"use client"

import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth()
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext)

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  })

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false)
      }
    } else {
      if (inputs.firstName && inputs.lastName && inputs.email && inputs.phone && inputs.city && inputs.password) {
        return setDisabled(false)
      }
    }

    setDisabled(true)
  })

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose)
    } else {
      signup(inputs, handleClose)
    }

  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent('bg-blue-400 text-white', "")} border p-1 px-4 rounded mr-3`}

      >
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            loading ? (
              <div className='py-24 px-2 h-[600px] flex justify-center'>

              </div>
            ) : (
              <div className="p-2 h-[600px]">
                {
                  error && (
                    <Alert severity='error' className='mb-5'>
                      {error}
                    </Alert>
                  )
                }
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  <p className="text-sm">

                    {renderContent("Sign In", "Create An Account")}
                  </p>
                  <p>
                    {data?.firstName} {data?.lastName}
                  </p>
                </div>
                <div className='m-auto'>
                  <h2 className="text-2xl font-light text-center">
                    {renderContent("Log Into Your Account", "Create Your OpenTable Account")}
                  </h2>
                  <AuthModalInputs inputs={inputs} handleChangeInput={handleChangeInput} isSignin={isSignin} />
                  <button
                    className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
                    disabled={disabled}
                    onClick={handleClick}
                  >
                    {renderContent("Sign In", "Create Account")}
                  </button>
                </div>
              </div>
            )
          }
        </Box>
      </Modal>
    </div>
  );
}