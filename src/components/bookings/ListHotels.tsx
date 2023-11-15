import React, { useState } from 'react';
import {
  ScheduleOutlined,
  StarFilled
} from '@ant-design/icons';
import { Button, Card, DatePicker, Divider, Form, Input, InputNumber, message, Modal, Select, Tag } from 'antd';
import { Hotels, Rooms } from '../../services/booking/types';
import { formatterMoney } from '../../utils';
import { makeReservation } from '../../services/booking/api';
import { NoticeType } from 'antd/es/message/interface';


interface ListHotelsProps {
  hotels: Hotels[];
  check_in: string;
  check_out: string;
}

const ListHotels: React.FC<ListHotelsProps> = ({ hotels, check_in, check_out }) => {
  const image_default = "data:image/png;base64,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"

  const [modalReservation, setModalReservation] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Rooms[]>([])
  const [maxPeopleRoom, setMaxPeopleRoom] = useState<number>(0)
  const [peopleRoom, setPeopleRoom] = useState<number | null>(null)
  const [formReservation] = Form.useForm();
  const [idHotel, setIdHotel] = useState<number>()
  const [messageApi, contextHolder] = message.useMessage();

  const notificationAction = (message: string, type: NoticeType = 'error') => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const openModalReservation = (data_hotel: Hotels) => {
    setIdHotel(data_hotel.id)
    setRooms(data_hotel.rooms)
    setModalReservation(true)
  }

  const handleCancelModalReservation = () => {
    setModalReservation(false)
    formReservation.resetFields()
  }

  const onFinish = async (values: any) => {

    let guests = []
    if (peopleRoom) {
      for (let i = 1; i <= peopleRoom; i++) {
        const guest = {
          name: values[`name_${i}`],
          last_name: values[`last_name_${i}`],
          birthday: values[`birthday_${i}`].format('YYYY-MM-DD'),
          type_document: values[`type_document_${i}`],
          document_number: values[`document_number_${i}`],
          genre: values[`genre_${i}`],
          email: values[`email_${i}`],
          cellphone: values[`cellphone_${i}`],
        };
        guests.push(guest);
      }
    }
    const data = {
      room_id: parseInt(values.room_id.split('-')[0]),
      hotel_id: idHotel,
      check_in: check_in,
      check_out: check_out,
      quantity_people: peopleRoom,
      guests: guests,
      emergency_contact: {
        name: values.name_emergency,
        last_name: values.last_name_emergency,
        cellphone: values.phone_emergency,
      }
    }

    try {
      const resp = await makeReservation(data);
      if (resp) {
        notificationAction(resp.message, 'success')
        handleCancelModalReservation()
      }
    } catch (error: any) {
      if (error.response) {
        notificationAction(error.response?.data.message)
      } else {
        notificationAction(error.message)
      }
    }
  }

  const handleChange = (value: string) => {
    const max_people = parseInt(value.split('-')[1])
    formReservation.resetFields(['quantity_people'])
    setMaxPeopleRoom(max_people)
  };

  const handleChangePeople = (value: number | null) => {
    setPeopleRoom(value)

    // Puedes realizar acciones adicionales aquí si es necesario
    // Por ejemplo, actualizar el estado del componente o realizar otras lógicas
  };

  return (
    <div className='container-bookings__hotels mb-8 flex flex-wrap gap-6'>
      {contextHolder}
      {
        hotels.map((hotel, index) => (
          <Card
            key={index}
            style={{ width: '300px' }}
            actions={[
              <div className='px-3'>
                <Button onClick={() => openModalReservation(hotel)} disabled={hotel.rooms.length > 0 ? false : true} className={`${hotel.rooms.length > 0 ? '' : 'opacity-50'} w-full !bg-smart-talent !text-white h-[45px]`} icon={<ScheduleOutlined />}>Reservar</Button>
              </div>
            ]}
          >
            <div>
              <div className='h-[200px] overflow-hidden '>
                <img className='w-full -translate-y-[15%]' src={image_default} alt={`Default ${index + 1}`} />
              </div>
              <div className='p-4'>
                <div className='container-bookings__hotels_rating grid grid-cols-12 mb-2'>
                  <StarFilled className='text-yellow-400' />
                  <StarFilled className='text-yellow-400' />
                  <StarFilled className='text-yellow-400' />
                  <StarFilled className='text-yellow-400' />
                  <StarFilled className='text-yellow-400' />
                </div>
                <div className='mb-2'>
                  <h3 className='font-bold text-lg'>{hotel.name}</h3>
                  <div className=''>
                    <div className='flex gap-2'>
                      <h4 className='font-semibold text-gray-500'>Ciudad: </h4>
                      <p>{hotel.city}</p>
                    </div>
                    <div className='flex gap-2'>
                      <h4 className='font-semibold text-gray-500'>Dirección: </h4>
                      <p>{hotel.address}</p>
                    </div>
                  </div>
                </div>
                <Card className='mb-2'>
                  <div className='text-xs'>
                    <h4 className='font-bold text-xs mb-2'>Habitaciones</h4>
                    <div className='flex flex-wrap'>
                      {
                        hotel.rooms.map((room, index) => (
                          <Tag key={index} className='mb-2'>{room.number} | {room.max_people} {room.max_people > 1 ? 'personas' : 'persona'} </Tag>
                        ))
                      }
                      {
                        hotel.rooms.length === 0 && (
                          <div className='h-[30px]'>No hay habitaciones disponibles</div>
                        )
                      }
                    </div>
                  </div>
                </Card>

                <div className='font-semibold text-xl h-[30px]'>
                  {hotel.rooms.length > 0 && ('COP ')}
                  {
                    hotel.rooms.length > 0 && formatterMoney.format(hotel.rooms.reduce((min, room) => Math.min(min, room.base_price), Infinity))
                  }
                </div>
              </div>
            </div>
          </Card>
        ))
      }
      {
        hotels.length === 0 && (
          <div className='text-center font-bold text-xl'>No hay hoteles disponibles, haz una busqueda</div>
        )
      }

      <Modal className='modal-reservation' footer={null} title={'Reservar'} open={modalReservation} okText={'Guardar cambios'} centered /* onOk={handleOk} */ onCancel={handleCancelModalReservation}>
        <Form
          form={formReservation}
          name="modal-reservation"
          layout="vertical"
          className='modal-reservation__form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className='grid grid-cols-2 gap-3'>
            <Form.Item
              label="Habitación"
              name="room_id"
              className='mb-0'
              rules={[{ required: true, message: 'Por favor elige una habitación' }]}
            >
              <Select
                onChange={handleChange}
                placeholder='Selecciona una habitación'
              >
                {
                  rooms.map((room, index) => (
                    <Select.Option key={index} value={`${room.id}-${room.max_people}`}>{room.number}</Select.Option>
                  ))
                }
              </Select>

            </Form.Item>
            <Form.Item
              label="Número de personas"
              name="quantity_people"
              className='mb-0'
              rules={[{ required: true, message: 'Por favor registra el número de personas' }]}
            >
              <InputNumber onChange={handleChangePeople} className='w-full' max={maxPeopleRoom} />
            </Form.Item>
          </div>
          {
            peopleRoom && [...Array(peopleRoom).keys()].map((index) => (
              <div key={index}>
                <Divider />
                <div className='grid grid-cols-2 gap-3'>
                  <Form.Item
                    label="Nombres"
                    name={`name_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor registra un nombre' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Apellidos"
                    name={`last_name_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor registra un apellido' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Fecha de nacimiento"
                    name={`birthday_${index + 1}`}
                  >
                    <DatePicker placeholder='Selecciona una fecha' className='w-full' />
                  </Form.Item>
                  <Form.Item
                    label="Tipo de documento"
                    name={`type_document_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor elige un tipo de documento' }]}
                  >
                    <Select
                      placeholder='Selecciona un tipo de documento'
                      options={[
                        { value: 'DNI', label: 'DNI' },
                        { value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
                        { value: 'Documento de identidad', label: 'Documento de identidad' },
                        { value: 'Pasaporte', label: 'Pasaporte' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Número de documento"
                    name={`document_number_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor registra un número de documento' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Género"
                    name={`genre_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor elige el género' }]}
                  >
                    <Select
                      placeholder='Selecciona un género'
                      options={[
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Femenino', label: 'Femenino' },
                        { value: 'Otro', label: 'Otro' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name={`email_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor registra un correo' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Teléfono de contacto"
                    name={`cellphone_${index + 1}`}
                    className='mb-4'
                    rules={[{ required: true, message: 'Por favor registra un teléfono de contacto' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            ))
          }
          <Divider />
          <h2 className='text-red-700 mb-2'>Emergency contact</h2>
          <div className='grid grid-cols-2 gap-3'>
            <Form.Item
              label="Nombres"
              name={`name_emergency`}
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra un nombre' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellidos"
              name={`last_name_emergency`}
              className='mb-4'
              rules={[{ required: true, message: 'Por favor registra un apellido' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Número de documento"
              name={`phone_emergency`}
              className='mb-4 '
              rules={[{ required: true, message: 'Por favor registra un número de documento' }]}
            >
              <InputNumber className='w-full'/>
            </Form.Item>
          </div>
          <div className='ant-modal-footer'>
            <Button htmlType="button" className="ant-btn-default !text-black" onClick={handleCancelModalReservation}>Cancelar</Button>
            <Button htmlType="submit" className="ant-btn-primary modal-reservation__main_action">Guardar cambios</Button>
          </div>
        </Form>
      </Modal>
    </div>

  )
}

export default ListHotels