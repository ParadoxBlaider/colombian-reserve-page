import { message } from 'antd';
import React, { useState } from 'react';


const BookingsPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

 /*  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  }; */

  /* const getDataBookings = async() => {
    try {
      const data = await test();
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  } */

  return (
      <div>
        {contextHolder}
        pagina web
      </div>
  )
};

export default BookingsPage;