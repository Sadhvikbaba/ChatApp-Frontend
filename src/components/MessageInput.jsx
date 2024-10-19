import React from 'react';
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { sendMessage } from '../connecting/connecting';

function MessageInput({ id, addMessage }) {
  const { register, handleSubmit, reset } = useForm();

  const send = async (data) => {
    await sendMessage(id, data)
      .then((res) => {
        addMessage(res.message);
        reset();
      });
  }

  return (
    <form className='px-4 my-3 ' onSubmit={handleSubmit(send)}>
      <div className='w-full relative '>
        <input
          type="text"
          className='border text-sm rounded-lg block w-full p-2.5 border-gray-600 bg-gray-600 text-white'
          placeholder='send a message'
          {...register("message", { required: true })}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 text-2xl'>
          <IoMdSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
