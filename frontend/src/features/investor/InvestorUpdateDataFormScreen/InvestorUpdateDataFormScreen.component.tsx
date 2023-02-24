import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { Form, Input, message, Button, Upload, Image, Alert, Spin } from 'antd';
import {
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { PageContainer, PageSubtitle } from '../Investor.styles';
import { InvestorUpdateDataForm } from './InvestorUpdateDataFormScreen.types';
import { investorDataFormValidationSchema } from './InvestorUpdateFormValidation';
import { Api } from '@/api';
import { RcFile } from 'antd/lib/upload';
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

  const [isLoging, setIsLoging] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

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
        setIsLoging(true);

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
          return message.success('Profile updated successfully!');
        }
      } catch (error) {
        return message.error('Something goes wrong');
      } finally {
        setIsLoging(false);
      }
    },
  });

  return (
    <PageContainer>
      {form.values.name ? (
        <>
          <UpdatePageTitle>Wellcome, {form.values.name}! 😎</UpdatePageTitle>
          <UpdatePageContainer>
            <PhotoContainer>
              <div>
                <PageSubtitle>Photo</PageSubtitle>
                {photo && <Image width={200} src={photo} />}
              </div>
              <div>
                <PageSubtitle>ID Card</PageSubtitle>
                {idPicture && <Image width={200} src={idPicture} />}
              </div>
            </PhotoContainer>
            <div>
              <PageSubtitle>
                You can update imforamtion about you up here
              </PageSubtitle>

              <form onSubmit={form.handleSubmit}>
                <Form.Item
                  validateStatus={form.errors.name ? 'error' : 'success'}
                  help={form.errors.name}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
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
                    placeholder="Surname"
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
                    placeholder="Parental name"
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
                    Photo:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
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
                    ID Card:{' '}
                    <Button icon={<UploadOutlined />}>Click to replace</Button>
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
            {isLoging ? <Spin indicator={antIcon} /> : 'Update'}
          </ButtonStyled>
        </>
      ) : (
        <Alert
          message="Error!"
          description="Unfortunately, we can't find your data..."
          type="error"
          showIcon
        />
      )}
    </PageContainer>
  );
};
