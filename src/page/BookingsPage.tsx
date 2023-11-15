import { Button, DatePicker, Form, InputNumber, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import GeneralLayout from '../components/common/layout/GeneralLayout';
import BannerSection from '../components/bookings/BannerSection';
import { Banners, Cities, Hotels } from '../services/booking/types';
import { getBannersHotels, getCitiesHotel, getHotelsFiltered } from '../services/booking/api';
import { NoticeType } from 'antd/es/message/interface';
import '../styles/bookings/index.css'
import ListHotels from '../components/bookings/ListHotels';


const BookingsPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [banners, setBanners] = useState<Banners[]>([])
  const [cities, setCities] = useState<Cities[]>([])
  const [hotels, setHotels] = useState<Hotels[]>([])
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')

  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const getBanners = async () => {
    try {
      const data = await getBannersHotels();
      if (data) {
        setBanners(data)
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }
  const getCities = async () => {
    try {
      const data = await getCitiesHotel();
      if (data) {
        setCities(data)
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const onFinish = async (fieldsValue: any) => {
    let values = null;
    values = fieldsValue
    if (fieldsValue['check_in'] && fieldsValue['check_out']) {
      values = {
        ...fieldsValue,
        'check_in': fieldsValue['check_in'].format('YYYY-MM-DD'),
        'check_out': fieldsValue['check_out'].format('YYYY-MM-DD'),
      };
      setCheckIn(fieldsValue['check_in'].format('YYYY-MM-DD'))
      setCheckOut(fieldsValue['check_out'].format('YYYY-MM-DD'))
    }

    try {
      const data = await getHotelsFiltered(values);
      if (data) {
        setHotels(data)
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  };

  useEffect(() => {
    getBanners(); // eslint-disable-next-line react-hooks/exhaustive-deps
    getCities(); // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
    };
  }, [])

  return (

    <GeneralLayout>
      <div className='container-bookings'>
        {contextHolder}
        <BannerSection banners={banners} />
        <div className='py-8'>
          <h2 className='font-bold text-3xl mb-3'>¿Cual es tu destino?</h2>
          <div>
            <Form
              className='container-bookings__form gap-3 flex'
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className='grid grid-cols-4 gap-3 w-[90%]'>
                <Form.Item
                  label="Ciudad"
                  name="city"
                  rules={[{ required: true, message: 'Por favor selecciona una ciudad' }]}

                >
                  <Select
                    allowClear
                  >
                    {
                      cities.map((city, index) => (
                        <Select.Option key={index} value={city.name}>{city.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Fecha de entrada"
                  name="check_in"
                  rules={[{ required: true, message: 'Por favor elige una fecha de entrada' }]}
                >
                  <DatePicker placeholder='Selecciona una fecha' className='w-full' />
                </Form.Item>
                <Form.Item
                  label="Fecha de salida"
                  name="check_out"
                  rules={[{ required: true, message: 'Por favor elige una fecha de salida' }]}
                >
                  <DatePicker placeholder='Selecciona una fecha' className='w-full' />
                </Form.Item>
                <Form.Item
                  label="Cantidad de personas"
                  name="quantity_people"
                >
                  <InputNumber className='w-full' />
                </Form.Item>
              </div>
              <div className='w-[10%] self-center mt-[30px]'>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className='bg-smart-talent w-full hover:!bg-blue-950'>
                    Buscar
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <ListHotels hotels={hotels} check_in={checkIn} check_out={checkOut} />
      </div>
    </GeneralLayout>
  )
};

export default BookingsPage;