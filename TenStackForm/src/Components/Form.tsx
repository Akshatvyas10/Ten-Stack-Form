// LoginForm.tsx
import { useForm } from '@tanstack/react-form';
import React from 'react';

import { z } from 'zod';





const Form:React.FC = () => {

  const form = useForm({
    defaultValues:{
      email:'',
      password: '',
      confirmpassword: '',
    },
    onSubmit: async (value:any) => {
      console.log('Form submitted:', value);
   
      // handle login here
    },
   
  });

  return (
    <div>
     

      <form onSubmit={(e) =>{e.preventDefault(); form.handleSubmit();}} >
      <div className="mb-4">
      <form.Field name="email"
           validators={{
            onChange: ({ value}) =>{
             if (value.length<=0 && z.string().email('Invalid email address')) {return 'Invalid email address'}
            }
           }}
        children={(field) => (
              <div className="mb-4 bg-green-600">
                <label className="block mb-1">Email Address</label>
                <input
                  type="email"
                  value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Amit@gmail.com"
                  className="md:w-[600px] w-full px-4 py-3 text-sm  bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors}</p>
                )}
              </div>
            )}/>
      </div>
  
      <div className="mb-4">
        <form.Field
          name="password"
          validators={{
            onChange:({value})=>{
            if(value.length>=0){return 'enter password' }
          }}}
          children={(field) => (
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={field.state.value}
                 placeholder="xxxxxxx"
                onChange={(e) => field.handleChange(e.target.value)}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {field.state.meta.isTouched && (
                <div className="mt-1 text-sm text-red-500">{field.state.meta.errors}</div>
              )}
            </div>
          )}
        />
      </div>

  
      <div className="mb-4">
        <form.Field
          name="confirmpassword"
          
          validators={{
            onChangeListenTo: ['password'],
            onChange:({value,fieldApi})=>{
              if (value !== fieldApi.form.getFieldValue('password')) {return 'enter correct confirmpassword' }
          }}}
          children={(field) => (
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={field.state.value}
                 placeholder="xxxxxxx"
                onChange={(e) => field.handleChange(e.target.value)}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {field.state.meta.isTouched && (
                <div className="mt-1 text-sm text-red-500">{field.state.meta.errors}</div>
              )}
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        {form.state.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
    </div>
  );
  
};

export default Form;
