
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchApiUserLogin } from '../../redux/reducers/user/UserLogin';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


const Login = (props) => {
  const [message, setMessage] = useState('');
  const [saveAccount, setSaveAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: async (value) => {
      try {
        const action = fetchApiUserLogin(value);
        await dispatch(action);
        if (saveAccount) {
          localStorage.setItem('ACCOUNT', JSON.stringify(value))
        }
        navigate('/')
      } catch (err) {
        setMessage(err.response.data.content);
      }

    },
  });



  

  return (
    <div className = "w-full py-28 block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
      <form onSubmit={formik.handleSubmit}
        className="bg-white py-6 px-10 sm:max-w-md w-full shadow-lg">
        <div className="sm:text-3xl text-2xl font-semibold text-center text-orange-600 mb-12">
          Đăng Nhập
        </div>
        {message && <p className='text-sm text-red-600 mb-5'>{message}</p>}
        <div >
          <div>
            <input name='taiKhoan' onChange={formik.handleChange} type="text" className="focus:outline-orange-600 border rounded-lg w-full p-2 text-lg border-orange-400 placeholder-gray-500" placeholder="Tài Khoản" />
          </div>


          <div className='mt-8 relative'>
            <input name='matKhau' onChange={formik.handleChange} type={showPassword ? 'text' : 'password'} className="focus:outline-orange-600 border rounded-lg border-b w-full p-2 text-lg border-orange-400 placeholder-gray-500 mb-8" placeholder="Mật Khẩu" />
            <div
              style={{ position: 'absolute', top: '17%', right: '10px', cursor: 'pointer' }}>
              {showPassword ? <EyeInvisibleOutlined onClick={() => setShowPassword(false)} /> : <EyeOutlined onClick={() => setShowPassword(true)} />}
            </div>
          </div>
          <div className="flex">
            <input type="checkbox" className="border-orange-400 cursor-pointer" onClick={() => setSaveAccount(!saveAccount)} defaultValue={saveAccount} />
            <div className="px-3 text-gray-500 ">
              lưu mật khẩu
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button type='submit' className=" cursor-pointer hover:border-sky-400  transition-all duration-500 rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-orange-600  to-orange-300 text-white text-lg font-semibold ">
              Đăng Nhập
            </button>
          </div>
          <div className="flex justify-center ">
            <p className="text-gray-500">Chưa có tài khoản </p>
            <NavLink to={'signup'} className="text-sky-600 pl-2"> Đăng Ký</NavLink>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Login