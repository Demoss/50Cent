import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { PageContainer, PageSubtitle } from '../Investor.styles';
import { InvestorUpdateDataForm } from './InvestorUpdateDataFormScreen.types';
import { investorDataFormValidationSchema } from './InvestorUpdateFormValidation';
import { Form, Input, message, Button, Upload, Image, Alert } from 'antd';
import { Api } from '@/api';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { useParams } from 'react-router-dom';
import {
  ButtonStyled,
  PhotoContainer,
  UpdatePageContainer,
  UpdatePageTitle,
} from './InvestorUpdateDataFormScreen.styles';

export const InvestorUpdateDataFormScreen: React.FC = () => {
  const params = useParams();
  const [photo, setPhoto] = useState('');
  const [idPicture, setIdPicture] = useState('');

  const id = params.id ? +params.id : 0;
  const getInvestorInfo = async () => {
    try {
      const response = await Api.getInvestorInfo({ id });
      form.setFieldValue('name', response.Name);
      form.setFieldValue('surname', response.Surname);
      form.setFieldValue('middleName', response.MiddleName);
      setPhoto(response.Photo);
      setIdPicture(response.IDFile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvestorInfo();
    // eslint-disable-next-line
  }, []);

  const form = useFormik<InvestorUpdateDataForm>({
    initialValues: {
      name: '',
      surname: '',
      middleName: '',
      photo: undefined,
      idFile: undefined,
    },
    validationSchema: investorDataFormValidationSchema,
    validateOnChange: false,

    async onSubmit(values) {
      try {
        const response = await Api.updateInvestor({
          id: id,
          name: values.name,
          surname: values.surname,
          middleName: values.middleName,
          photo: values.photo ? (values.photo as RcFile) : undefined,
          idFile: values.idFile ? (values.idFile as RcFile) : undefined,
        });
        (values.photo || values.idFile) && getInvestorInfo();
        if (response.status === 'Added updated to user') {
          return message.success('Профіль успішно оновлений!');
        }
      } catch (error) {
        return message.error('Something goes wrong');
      }
    },
  });

  return (
    <PageContainer>
      {form.values.name ? (
        <>
          <UpdatePageTitle>Вітаємо, {form.values.name}! 😎</UpdatePageTitle>
          <UpdatePageContainer>
            <PhotoContainer>
              <div>
                <PageSubtitle>Фото</PageSubtitle>
                {photo && <Image width={200} src={photo} />}
              </div>
              <div>
                <PageSubtitle>Паспорт</PageSubtitle>
                {idPicture && <Image width={200} src={idPicture} />}
              </div>
            </PhotoContainer>
            <div>
              <PageSubtitle>Тут ви можете змінити свої дані</PageSubtitle>

              <form onSubmit={form.handleSubmit}>
                <Form.Item
                  validateStatus={form.errors.name ? 'error' : 'success'}
                  help={form.errors.name}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Ім'я"
                    name="name"
                    value={form.values.name}
                    onChange={form.handleChange}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={form.errors.surname ? 'error' : 'success'}
                  help={form.errors.surname}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Прізвище"
                    name="surname"
                    value={form.values.surname}
                    onChange={form.handleChange}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={form.errors.middleName ? 'error' : 'success'}
                  help={form.errors.middleName}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="По батькові"
                    name="middleName"
                    value={form.values.middleName}
                    onChange={form.handleChange}
                  />
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                  <Upload
                    beforeUpload={(file) => {
                      form.setFieldValue('photo', file);
                      return false;
                    }}
                  >
                    <span style={{ color: 'red' }}>*</span>
                    Фото:{' '}
                    <Button icon={<UploadOutlined />}>
                      Натисність, щоб змінити
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                  <Upload
                    beforeUpload={(file) => {
                      form.setFieldValue('idFile', file);
                      return false;
                    }}
                  >
                    <span style={{ color: 'red' }}>*</span>
                    Паспорт:{' '}
                    <Button icon={<UploadOutlined />}>
                      Натисність, щоб змінити
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item></Form.Item>
              </form>
            </div>
          </UpdatePageContainer>
          <ButtonStyled
            type="primary"
            onClick={() => form.handleSubmit()}
            danger
          >
            Оновити
          </ButtonStyled>
        </>
      ) : (
        <Alert
          message="Помилка!"
          description="Нажаль ми не можемо знайти ваші дані..."
          type="error"
          showIcon
        />
      )}
    </PageContainer>
  );
};
