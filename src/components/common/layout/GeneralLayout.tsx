import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

interface DataLayout {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<DataLayout> = ({ children }) => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="h-[50px]">
          <img className='h-full' src="https://smartalentit.com/wp-content/uploads/2021/11/SmartTalent-blanco.png" alt="Smart talent logo" />
        </div>
      </Header>
      <Content className="site-layout px-40 bg-white">
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>2023 ©Copyright, todos los derechos reservados - Miguel Acevedo - Smart Talent</Footer>
    </Layout>
  );
};

export default GeneralLayout;